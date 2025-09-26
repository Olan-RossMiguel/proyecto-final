import { Loader, HatGlasses } from 'lucide-react'
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
    return (<div className='flex justify-center items-center'><Loader className='animate-spin' size={50} /></div>)
  }

  return (
    <div className='w-full px-10 py-10 bg-black/10 rounded-xl border border-slate-800 backdrop-blur-md flex flex-col justify-center items-center'>
      <HatGlasses size={90} strokeWidth={1} />
      <h1 className='text-3xl'>{user.name}</h1>
      <h2 className='italic text-gray-600 pt-3'><span className='text-emerald-600 font-bold'>#Flicker</span> <span className='text-gray-300 font-normal'>desde:</span> {fecha.toLocaleString()}</h2>
      <p className='text-gray-300'>Direccion de correo: {user.email}</p>
    </div>
  )
}
