import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getReviewsByMovie = async (movieId) => {
  return await prisma.review.findMany({
    where: { movieId },
    include: { user: true, likes: true },
  })
}

export const createReview = async (data) => {
  return await prisma.review.create({ data })
}
