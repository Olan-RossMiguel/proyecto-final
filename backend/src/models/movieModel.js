import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllMovies = async () => {
  return await prisma.movie.findMany()
}

export const getMovieById = async (id) => {
  return await prisma.movie.findUnique({ where: { id } })
}

export const createMovie = async (data) => {
  return await prisma.movie.create({ data })
}
