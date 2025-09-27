import { Link } from 'react-router-dom'
import { BookOpenText, Star } from 'lucide-react'

export default function MovieCard ({
  movie,
  defaultImage = '/placeholder.svg',
  className = '',
}) {
  const avg = Number.isFinite(movie?.avgRating) ? Number(movie.avgRating) : 0
  const rating = Math.round(Math.max(0, Math.min(5, avg)))
  const ratingsCount = movie?.ratingsCount ?? 0
  const releaseYear = movie?.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null

  return (
    <Link
      to={`/movies/${movie.id}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl bg-slate-800/15 border border-black backdrop:blur-sm shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
    >
      {/* Póster (2:3 aprox.) */}
      <div className='relative aspect-[2/3] w-full overflow-hidden bg-gray-800/90'>
        <img
          src={movie?.posterUrl || defaultImage}
          alt={`Póster de ${movie?.title ?? 'Película'}`}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          onError={(e) => (e.currentTarget.src = defaultImage)}
          loading='lazy'
        />
        {releaseYear && (
          <span className='absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-xs font-medium text-white'>
            {releaseYear}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className='flex flex-1 flex-col p-4'>
        <h2 className='mb-1 line-clamp-1 text-2xl font-semibold text-white'>
          {movie?.title}
        </h2>

        {/* Rating */}
        <div className='mb-2 flex items-center gap-1' aria-label={`Calificación ${avg.toFixed(1)} de 5`}>
          {[...Array(5)].map((_, i) => {
            const active = i < rating
            return (
              <Star
                key={i}
                size={16}
                className={active ? 'text-amber-400' : 'text-gray-300'}
                fill={active ? 'currentColor' : 'none'}
                stroke='currentColor'
              />
            )
          })}
          <span className='ml-2 text-xs text-gray-600'>
            {avg.toFixed(1)}/5 • {ratingsCount} reseña{ratingsCount === 1 ? '' : 's'}
          </span>
        </div>

        {/* Descripción */}
        <p className='mb-3 line-clamp-2 flex-1 text-sm text-gray-300'>
          {movie?.description}
        </p>

        {/* CTA */}
        <div className='mt-auto'>
          <span className='w-full rounded-lg bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white transition-colors group-hover:bg-emerald-700 flex gap-2 align-center justify-center items-center'>
            <BookOpenText strokeWidth={2.5} size={14} />
            Ver detalles
          </span>
        </div>
      </div>
    </Link>
  )
}
