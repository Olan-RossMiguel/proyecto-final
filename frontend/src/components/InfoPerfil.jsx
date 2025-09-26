import {
  Loader,
  HatGlasses,
  CircleUser,
  Skull,
  TriangleAlert,
  Pencil,
} from 'lucide-react'
import { api } from '../api/client'
import { useState, useEffect } from 'react'

/**
 * Componente para mostrar la información del perfil de un usuario.
 * Realiza una petición a la API para obtener los datos del usuario autenticado
 * y los muestra en una tarjeta de perfil.
 * @returns {JSX.Element} La tarjeta con la información del perfil del usuario.
 */
export const InfoPerfil = () => {
  // Estado para almacenar la información del usuario.
  const [user, setUser] = useState(null)
  //   Estado para almacenar la fecha
  const [fecha, setFecha] = useState(null)
  // Estado para controlar la visualización del loader mientras se cargan los datos.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Función asíncrona para verificar la autenticación y obtener los datos del perfil.
    const fetchProfileData = async () => {
      try {
        const userData = await api.profile()
        setUser(userData)
        // Convierte la fecha de formato ISO a un objeto Date para poder formatearla.
        setFecha(new Date(userData.createdAt))
      } catch (error) {
        // Captura y muestra en consola cualquier error durante el fetch.
        console.error('Error al obtener los datos del perfil:', error)
      } finally {
        // Se ejecuta siempre, al finalizar el try o el catch para ocultar el loader.
        setLoading(false)
      }
    }
    // Llama a la función al montar el componente.
    fetchProfileData()
  }, [])

  //   Animacion de carga, se muestra si loading es true.
  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Loader className='animate-spin' size={50} />
      </div>
    )
  }

  return (
    <div className='w-full px-10 py-10 bg-black/10 rounded-xl border border-slate-800 backdrop-blur-md flex justify-center items-center gap-10'>
      <div className='flex flex-col justify-center items-start gap-1 border border-emerald-700 rounded-2xl px-4 py-3 bg-black/70 hover:scale-102 transition-all duration-400'>
        <div className='flex items-center gap-3'>
          {/* TODO: añadir logica cuando se integre foto de perfil */}
          <CircleUser size={50} strokeWidth={1} />

          <div>
            <h1 className='text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent'>{user.name}</h1>
            <p className='text-gray-400'>{user.email}</p>
          </div>
        </div>

        <h2 className=' text-gray-200'>
          <span className='text-gray-400 font-normal'>Flicker desde: </span>
          {fecha.toLocaleDateString()}
        </h2>

        <div className='flex flex-col w-full gap-2'>

          <button className='flex justify-center items-center border-gray-600 text-gray-400 hover:bg-emerald-950 hover:border-emerald-500 border rounded-xl p-2 hover:text-emerald-500 gap-1 transition-all duration-200'>
            <Pencil strokeWidth={2} size={17} />
            <span>Editar perfil</span>
          </button>

          <button className='flex justify-center items-center border-gray-600 text-gray-400 hover:bg-red-950 hover:border-red-500 border rounded-xl p-2 hover:text-red-500 gap-1 transition-all duration-200'>
            <TriangleAlert strokeWidth={2} size={18} />
            <span>Eliminar perfil</span>
          </button>
        </div>
      </div>

      <div>
        <p>            Listas, contenido y comentarios
        </p>
      </div>
    </div>
  )
}
