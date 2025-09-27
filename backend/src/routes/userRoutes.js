import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = await prisma.user.create({ data: req.body })
    res.json(nuevoUsuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error creando usuario" })
  }
})

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany()
    res.json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo usuarios" })
  }
})

// Modificar usuario
router.put("/:id", async (req, res) => {
  try {
    const usuarioActualizado = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(usuarioActualizado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error actualizando usuario" })
  }
})

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: "Usuario eliminado" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error eliminando usuario" })
  }
})

export default router

