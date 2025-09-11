import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

// Dar like a reseña
router.post("/", async (req, res) => {
  try {
    const nuevoLike = await prisma.reviewLike.create({ data: req.body })
    res.json(nuevoLike)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error dando like" })
  }
})

// Quitar like
router.delete("/", async (req, res) => {
  try {
    const { userId, reviewId } = req.body
    const eliminado = await prisma.reviewLike.delete({
      where: { userId_reviewId: { userId: Number(userId), reviewId: Number(reviewId) } },
    })
    res.json(eliminado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error quitando like" })
  }
})

export default router

