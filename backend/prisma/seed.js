import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

/**
 * Script para poblar la base de datos con datos iniciales (seeding).
 * Crea usuarios, películas, reseñas y likes de reseñas para desarrollo y pruebas.
 */

const prisma = new PrismaClient()

async function main() {
  const password1 = await bcrypt.hash("password123", 10)
const password2 = await bcrypt.hash("secret456", 10)

const users = await prisma.user.createMany({
  data: [
    { name: "Juan Pérez", email: "juan@example.com", passwordHash: password1 },
    { name: "María López", email: "maria@example.com", passwordHash: password2 },
    { name: "Carlos Ramírez", email: "carlos@example.com", passwordHash: password1 },
    { name: "Ana Torres", email: "ana@example.com", passwordHash: password2 },
    { name: "Luis Martínez", email: "luis@example.com", passwordHash: password1 },
  ],
  skipDuplicates: true, // evita duplicados si corres el seed otra vez
})

const movies = await prisma.movie.createMany({
  data: [
    { title: "Inception", description: "Un thriller de sueños dentro de sueños", posterUrl: "https://picsum.photos/200/300", releaseDate: new Date("2010-07-16") },
    { title: "The Matrix", description: "Realidad virtual y máquinas dominando el mundo", posterUrl: "https://picsum.photos/200/301", releaseDate: new Date("1999-03-31") },
    { title: "Interstellar", description: "Viajes espaciales y agujeros negros", posterUrl: "https://picsum.photos/200/302", releaseDate: new Date("2014-11-07") },
    { title: "Parasite", description: "La lucha de clases en Corea del Sur", posterUrl: "https://picsum.photos/200/303", releaseDate: new Date("2019-05-30") },
    { title: "The Dark Knight", description: "Batman vs el Joker", posterUrl: "https://picsum.photos/200/304", releaseDate: new Date("2008-07-18") },
    { title: "Avengers: Endgame", description: "La batalla final contra Thanos", posterUrl: "https://picsum.photos/200/305", releaseDate: new Date("2019-04-26") },
    { title: "Titanic", description: "Romance en medio de una tragedia histórica", posterUrl: "https://picsum.photos/200/306", releaseDate: new Date("1997-12-19") },
    { title: "Gladiator", description: "Un general romano convertido en esclavo", posterUrl: "https://picsum.photos/200/307", releaseDate: new Date("2000-05-05") },
    { title: "Joker", description: "La historia de origen del villano", posterUrl: "https://picsum.photos/200/308", releaseDate: new Date("2019-10-04") },
    { title: "Toy Story", description: "Juguetes con vida propia", posterUrl: "https://picsum.photos/200/309", releaseDate: new Date("1995-11-22") },
  ],
  skipDuplicates: true,
})

const allUsers = await prisma.user.findMany()
const allMovies = await prisma.movie.findMany()

// ejemplo: 3 reseñas
await prisma.review.createMany({
  data: [
    { userId: allUsers[0].id, movieId: allMovies[0].id, rating: 5, comment: "Increíble película, me voló la mente!" },
    { userId: allUsers[1].id, movieId: allMovies[1].id, rating: 4, comment: "Muy buena, aunque un poco confusa." },
    { userId: allUsers[2].id, movieId: allMovies[2].id, rating: 5, comment: "De lo mejor en ciencia ficción." },
  ],
  skipDuplicates: true,
})

const allReviews = await prisma.review.findMany()

await prisma.reviewLike.createMany({
  data: [
    { userId: allUsers[3].id, reviewId: allReviews[0].id },
    { userId: allUsers[4].id, reviewId: allReviews[0].id },
    { userId: allUsers[0].id, reviewId: allReviews[2].id },
  ],
  skipDuplicates: true,
})

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
