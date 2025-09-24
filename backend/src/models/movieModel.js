import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllMovies = async () => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc' 
      }
    })

    const moviesWithStats = movies.map(movie => {
      const ratingsCount = movie.reviews.length
      const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0)
      const avgRating = ratingsCount > 0 ? totalRating / ratingsCount : 0

      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        posterUrl: movie.posterUrl,
        releaseDate: movie.releaseDate,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        avgRating: Math.round(avgRating * 10) / 10, 
        ratingsCount
      }
    })

    return moviesWithStats
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw new Error('No se pudieron cargar las películas')
  }
}

export const getMovieById = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(id) },
    include: {
      reviews: {
        select: {
          rating: true,
          comment: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (!movie) return null

  const ratingsCount = movie.reviews.length
  const avgRating = ratingsCount > 0 
    ? movie.reviews.reduce((sum, review) => sum + review.rating, 0) / ratingsCount
    : 0

  return {
    ...movie,
    avgRating: Number(avgRating.toFixed(1)),
    ratingsCount
  }
}

export const createMovie = async (data) => {
  return await prisma.movie.create({ data })
}
