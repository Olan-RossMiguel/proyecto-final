import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Film, User as ProfileIcon } from 'lucide-react'

const LOGO_URL = 'https://i.imgur.com/vF3eXDG.png'

/**
 * Barra de navegación principal de la aplicación.
 * Muestra el logo, enlaces de navegación y opciones de usuario (perfil, cerrar sesión).
 * Se adapta a vistas de escritorio y móvil.
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.isAuthenticated - Indica si el usuario está autenticado.
 * @param {object} [props.user] - Objeto con la información del usuario autenticado.
 * @param {Function} props.onLogout - Función para manejar el cierre de sesión.
 * @returns {JSX.Element} El componente de la barra de navegación.
 */
export default function Navbar ({ isAuthenticated, user, onLogout }) {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Este useEffect redirige al login si el usuario no está disponible.
  useEffect(() => {
    // si no hay user, redirigir a login
    if (!user) {
      navigate('/login')
    }
  }, [])

  const handleAvatarClick = () => {
    setProfileOpen(!profileOpen)
  }

  const handleLogoutClick = async () => {
    setProfileOpen(false)
    await onLogout()
  }

  const linkBase =
    'relative px-4 py-2 text-sm font-medium transition-colors duration-200'
  const linkActive = 'text-emerald-400 border-b-2 border-emerald-500'
  const linkIdle = 'text-gray-300 hover:text-emerald-400'

  return (
    <header className='sticky top-0 z-40 w-full bg-black/70 backdrop-blur-sm shadow-lg'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 h-14'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-3'
          onClick={() => setOpen(false)}
        >
          <img
            src={LOGO_URL}
            alt='CineReviews Logo'
            className='h-8 w-auto object-contain'
          />
          <span className='hidden text-xl font-bold text-white sm:inline'>
            FlickPick
          </span>
        </Link>

        {/* Centro: Links de navegación (desktop) */}
        <div className='items-center h-max m-0 flex'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle} flex gap-2 align-center justify-center text-center items-center`}
          >
            <Film strokeWidth={1.5} size={17} />
            <span>Películas</span>
          </NavLink>
        </div>

        {/* Lado derecho: Avatar y menú móvil */}
        <div className='flex items-center gap-3'>
          {/* Avatar con dropdown al hacer CLIC */}
          {isAuthenticated ? (
            <div className='relative flex items-center gap-2' ref={profileRef}>
              {/* Nombre del usuario (solo desktop) */}
              <span className='hidden text-gray-300 sm:inline'>
                {user?.name || 'Usuario'}
              </span>

              <button
                onClick={handleAvatarClick}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-800 text-white outline-none transition-all hover:border-emerald-500 hover:bg-gray-700'
                aria-label='Menú de usuario'
              >
                {/* Siempre mostrar icono por defecto ya que no hay avatarUrl */}
                <User size={20} className='text-gray-300' />
              </button>

              {/* Dropdown que aparece al hacer CLIC */}
              {profileOpen && (
                <div className='absolute right-0 mt-12 w-48 overflow-hidden rounded-xl border border-gray-700 bg-black shadow-2xl z-50'>
                  <div className='p-2'>
                    <Link
                      to='/profile'
                      onClick={() => setProfileOpen(false)}
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-emerald-400'
                    >
                      <ProfileIcon size={18} />
                      <span>Ver perfil</span>
                    </Link>

                    <button
                      onClick={handleLogoutClick}
                      className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-gray-300 transition-colors hover:bg-gray-800 hover:text-red-400'
                    >
                      <LogOut size={18} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to='/login'
              className='inline-flex items-center gap-2 rounded-lg border border-emerald-500 bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:hidden'
            >
              Entrar
            </Link>
          )}

          {/* Botón de menú móvil */}
          <button
            className='inline-flex items-center justify-center rounded-lg p-2 text-white outline-none transition-colors hover:bg-gray-800 hover:text-emerald-400 sm:hidden'
            onClick={() => setOpen(!open)}
            aria-label='Abrir menú'
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className='sm:hidden'>
          <div className='border-t border-gray-800 bg-black px-4 py-3'>
            <NavLink
              to='/'
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-400 bg-gray-800'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-emerald-400'
                }`}
            >
              Películas
            </NavLink>

            {isAuthenticated
              ? (
                <>
                  <Link
                    to='/profile'
                    onClick={() => setOpen(false)}
                    className='block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-emerald-400'
                  >
                    Ver perfil
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className='block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-red-400'
                  >
                    Cerrar sesión
                  </button>
                </>
                )
              : (
                <Link
                  to='/login'
                  onClick={() => setOpen(false)}
                  className='block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-emerald-400'
                >
                  Iniciar sesión
                </Link>
                )}
          </div>
        </div>
      )}
    </header>
  )
}
