import { useEffect, useState, useMemo } from 'react'
import MovieCard from '../components/MovieCard'

export default function Home () {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  const API_BASE = useMemo(
    () => import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api',
    []
  )

  useEffect(() => {
    let alive = true

    async function load () {
      setLoading(true)
      setErr('')
      try {
        const res = await fetch(`${API_BASE}/movies`, {
          credentials: 'include',
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Error ${res.status}`)
        }
        const data = await res.json()
        if (alive) setMovies(Array.isArray(data) ? data : data?.items ?? [])
      } catch (e) {
        if (alive) setErr(e?.message || 'No se pudieron cargar las películas')
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [API_BASE])

  return (
    <div className='min-h-screen bg-gray-900 pt-6'>
      {/* REDUCIDO: py-8 → py-4 y mb-6 → mb-4 */}
      <div className='mx-auto max-w-7xl px-4 py-4'>

        {/* Error */}
        {err && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
            {err}
          </div>
        )}

        {loading
          ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className='animate-pulse overflow-hidden rounded-xl bg-white shadow'
                >
                  <div className='aspect-[2/3] w-full bg-gray-200' />
                  <div className='space-y-2 p-4'>
                    <div className='h-4 w-3/4 rounded bg-gray-200' />
                    <div className='h-3 w-1/2 rounded bg-gray-200' />
                    <div className='h-3 w-full rounded bg-gray-200' />
                  </div>
                </div>
              ))}
            </div>
            )
          : movies.length === 0
            ? (
              <div className='rounded-xl border border-gray-200 bg-white p-8 text-center'>
                <p className='text-gray-700'>No hay películas para mostrar.</p>
                <p className='text-sm text-gray-500'>
                  Cuando agregues alguna, aparecerá aquí.
                </p>
              </div>
              )
            : (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
                {movies.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
              )}
      </div>
    </div>
  )
}
