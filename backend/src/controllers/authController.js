import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

// Registrar usuario
export const register = async (req, res) => {
    const { email, password, name } = req.body

    try {
        // Verificar si ya existe un usuario con ese email
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) return res.status(400).json({ message: "El email ya está registrado" })

        // Hashea la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        // Crear usuario
        const userSaved = await prisma.user.create({
            data: { name, email, passwordHash }
        })

        // Generar token
        const token = jwt.sign(
            { id: userSaved.id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
            maxAge: 24 * 60 * 60 * 1000 
        })

        res.json({
            id: userSaved.id,
            name: userSaved.name,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Login
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await prisma.user.findUnique({ where: { email } })
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

        const isMatch = await bcrypt.compare(password, userFound.passwordHash)
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

        const token = jwt.sign(
            { id: userFound.id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  })
  return res.sendStatus(200)
}

// Perfil
export const profile = async (req, res) => {
    try {
        const userFound = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

        // Devuelve los datos del usuario, no solo un mensaje
        res.json(userFound)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
