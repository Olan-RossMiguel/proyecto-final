import { useEffect } from 'react'

export const Hero = () => {
  useEffect(() => {
    console.log('Hola!')
  }, [])

  return (
    <section className='h-dvh text-amber-50'>
      {/* Hero movie */}
      <div className='flex'>
        <img
          className='absolute -z-50 h-96 w-dvw blur-lg'
          src='https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg'
          alt=''
        />
        {/* Mascara de degradado y container de titulo y descripcion */}
        <div className='flex justify-end p-10 w-dvw h-96 bg-gradient-to-t from-black from-0%  to-transparent to-150%'>
          {/* Poster container */}
          <div>
            <img
              className='h-70 w-auto'
              src='https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg'
              alt=''
            />
          </div>
          {/* Text container */}
          <div className='pl-10 flex flex-col justify-end'>
            {/* Titulo */}
            <h1 className='text-7xl'>Star Trek</h1>
            {/* Info */}
            <p className='italic p-0.5 w-auto bg-teal-950 rounded-xl text-teal-400'>127 min, 2009, PG-13, Action, Adventure, Sci-Fi</p>
            {/* Descripcion */}
            <p>
              The brash James T. Kirk tries to live up to his father's legacy
              with Mr. Spock keeping him in check as a vengeful Romulan from the
              future creates black holes to destroy the Federation one planet at
              a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
