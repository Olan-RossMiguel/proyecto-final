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
  const userId = Number(req.params.id)
  // Extraemos solo los campos que permitimos actualizar
  const { name, email } = req.body

  // TODO: Añadir middleware de autenticación para obtener req.user
  // if (req.user.id !== userId) {
  //   return res.status(403).json({ error: "No tienes permiso para actualizar este usuario" });
  // }

  try {
    const usuarioActualizado = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
      where: { id: userId },
      // Pasamos solo los datos permitidos. Si un campo es undefined, Prisma lo ignora.
      data: {
        name,
        email,
      },
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
    res.json({ message: "Su cuenta ha sido eliminada correctamente" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error eliminando usuario" })
  }
})

export default router

