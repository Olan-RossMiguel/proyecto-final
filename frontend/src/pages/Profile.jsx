import { HatGlasses, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

/**
 * Componente para mostrar la información del perfil de un usuario.
 * Esta informacion es proveida por el componente padre via props,
 * el componente padre hace la peticion al servidor para traer los datos de usuario.
 * TODO: veo mas mantenible migrar el componente por separado y que este haga el consumo por separado.
 *
 * @param {object} props.user - El objeto de usuario que contiene la información a mostrar.
 * @param {string} props.user.createdAt - La fecha de creación del usuario en formato ISO.
 * @param {string} props.user.name - El nombre del usuario.
 * @param {string} props.user.email - El correo electrónico del usuario.
 * @returns {JSX.Element} La tarjeta con la información del perfil del usuario.
 */
const InfoPerfil = ({ user }) => {
  // Convierte la fecha de formato ISO a un objeto Date para poder formatearla.
  const fechaIso = user.createdAt // '2023-10-27T10:00:00.000Z'
  const fecha = new Date(fechaIso)

  return (
    <div className='w-full px-10 py-10 bg-black/10 rounded-xl border border-slate-800 backdrop-blur-md flex flex-col justify-center items-center'>
      <HatGlasses size={90} strokeWidth={1} />
      <h1 className='text-3xl'>{user.name}</h1>
      <h2 className='italic text-gray-600 pt-3'><span className='text-emerald-600 font-bold'>#Flicker</span> <span className='text-gray-300 font-normal'>desde:</span> {fecha.toLocaleString()}</h2>
      <p className='text-gray-300'>Direccion de correo: {user.email}</p>
    </div>
  )
}

/**
 * Página de perfil de usuario.
 * Obtiene y muestra la información del perfil del usuario autenticado.
 * Muestra un estado de carga mientras se obtienen los datos.
 * @returns {JSX.Element} El componente de la página de perfil.
 */
export const Profile = () => {
  // Estado para almacenar la información del usuario.
  const [user, setUser] = useState()
  // Estado para controlar la visualización del loader mientras se cargan los datos.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Función asíncrona para verificar la autenticación y obtener los datos del perfil.
    async function checkAuth () {
      try {
        // Obtiene la URL base de la API desde las variables de entorno, con un fallback para desarrollo local.
        const API_BASE =
          import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api'

        // Realiza la petición al endpoint del perfil.
        const res = await fetch(`${API_BASE}/profile`, {
          credentials: 'include', // Incluye cookies en la petición para la autenticación.
        })

        // Si la respuesta es exitosa (status 2xx), procesa los datos.
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        }
      } catch (error) {
        // Captura y muestra en consola cualquier error durante el fetch.
        console.error('Error al verificar la autenticación:', error)
      } finally {
        // Se ejecuta siempre, al finalizar el try o el catch. Oculta el loader.
        setLoading(false)
      }
    }
    // Llama a la función al montar el componente.
    checkAuth()
  }, [])

  return (
    <>
      {/* Contenedor del fondo animado y decorativo */}
      <div className='fixed inset-0 w-full h-full bg-white dark:bg-gray-950 z-0'>
        <svg
          className='absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.07]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <filter id='noise'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.65'
              numOctaves={3}
              stitchTiles='stitch'
            />
            <feColorMatrix type='saturate' values={0} />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,246,228,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%)]'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(253,224,71,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(250,204,21,0.08),transparent_40%)]' />
        </div>
      </div>

      {/* Contenedor principal del contenido de la página */}
      <div className='relative z-30 p-20 text-amber-50'>
        {/* Renderizado condicional: muestra el loader si está cargando, si no, muestra la info del perfil. */}
        {loading ? (<div className='flex justify-center items-center'><Loader className='animate-spin' size={50} /></div>) : (<InfoPerfil user={user} />)}
      </div>
    </>

  )
}
