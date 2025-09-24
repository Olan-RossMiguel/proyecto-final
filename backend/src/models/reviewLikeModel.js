import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const addLike = async (data) => {
  return await prisma.reviewLike.create({ data })
}

export const removeLike = async (userId, reviewId) => {
  return await prisma.reviewLike.delete({
    where: { userId_reviewId: { userId, reviewId } },
  })
}
