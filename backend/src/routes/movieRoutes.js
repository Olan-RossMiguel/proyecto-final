import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { getAllMovies } from "../models/movieModel.js"

const router = Router()
const prisma = new PrismaClient()

// Crear película
router.post("/", async (req, res) => {
  try {
    const nuevaMovie = await prisma.movie.create({ data: req.body })
    res.json(nuevaMovie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error creando película" })
  }
})

// Obtener todas las películas
router.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies() 
    res.json(movies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo películas" })
  }
})

// Modificar película
router.put("/:id", async (req, res) => {
  try {
    const movieActualizada = await prisma.movie.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(movieActualizada)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error actualizando película" })
  }
})

// Eliminar película
router.delete("/:id", async (req, res) => {
  try {
    await prisma.movie.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: "Película eliminada" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error eliminando película" })
  }
})

export default router

