import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Crear reseña
router.post("/", async (req, res) => {
  try {
    const nuevaReview = await prisma.review.create({ data: req.body })
    res.json(nuevaReview)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error creando reseña" })
  }
})

// Obtener todas las reseñas de una película
router.get("/movie/:movieId", async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { movieId: Number(req.params.movieId) },
      include: { user: true, likes: true },
    })
    res.json(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo reseñas" })
  }
})

// Modificar reseña
router.put("/:id", async (req, res) => {
  try {
    const reviewActualizada = await prisma.review.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(reviewActualizada)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error actualizando reseña" })
  }
})

// Eliminar reseña
router.delete("/:id", async (req, res) => {
  try {
    await prisma.review.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: "Reseña eliminada" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error eliminando reseña" })
  }
})

export default router

