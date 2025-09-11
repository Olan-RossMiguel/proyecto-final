import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllUsers = async () => {
  return await prisma.user.findMany()
}

export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } })
}

export const createUser = async (data) => {
  return await prisma.user.create({ data })
}
