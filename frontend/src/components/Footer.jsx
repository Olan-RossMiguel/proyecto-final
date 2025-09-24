// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { Film, User, Mail } from 'lucide-react'

export default function Footer () {
  const linkBase = 'text-gray-300 hover:text-emerald-400 transition-colors'

  return (
    <footer className='bg-black/90 text-gray-300 backdrop-blur-sm border-t border-gray-800'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:py-12 flex flex-col sm:flex-row justify-between gap-8'>
        {/* Logo y descripción */}
        <div className='flex flex-col gap-3'>
          <Link to='/' className='flex items-center gap-3'>
            <img
              src='https://i.imgur.com/vF3eXDG.png'
              alt='CineReviews Logo'
              className='h-8 w-auto object-contain'
            />
            <span className='hidden sm:inline text-xl font-bold text-white'>FlickPick</span>
          </Link>
          <p className='text-gray-400 text-sm sm:text-base max-w-xs'>
            Explora y califica tus películas y series favoritas. ¡Únete a nuestra
            comunidad de cinéfilos!
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div className='flex flex-col gap-2'>
          <h3 className='font-semibold text-white'>Navegación</h3>
          <Link to='/' className={`${linkBase} flex items-center gap-2`}>
            <Film size={16} /> Películas
          </Link>
          <Link to='/profile' className={`${linkBase} flex items-center gap-2`}>
            <User size={16} /> Perfil
          </Link>
          <Link to='/contact' className={`${linkBase} flex items-center gap-2`}>
            <Mail size={16} /> Contacto
          </Link>
        </div>

        {/* Redes sociales o info de contacto */}
        <div className='flex flex-col gap-2'>
          <h3 className='font-semibold text-white'>Contacto</h3>
          <p className='text-gray-400 text-sm sm:text-base'>soporte@flickpick.com</p>
          <p className='text-gray-400 text-sm sm:text-base'>+52 123 456 7890</p>
        </div>
      </div>

      <div className='border-t border-gray-800 mt-6'>
        <p className='text-center text-gray-500 text-sm py-4'>
          &copy; {new Date().getFullYear()} FlickPick. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}