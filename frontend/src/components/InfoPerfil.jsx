import {
  Loader,
  CircleUser,
  TriangleAlert,
  Pencil,
} from 'lucide-react'
import { api } from '../api/client'
import { useState, useEffect } from 'react'

// --- Clases de estilo para Tailwind CSS ---
const containerStyles = 'w-full px-10 py-10 rounded-xl border border-black flex justify-center items-center gap-10'
const cardStyles = 'flex flex-col justify-center items-start gap-2 rounded-2xl px-4 py-3 hover:shadow-2xl/90 transition-all duration-400 shadow-xl/40 border border-black bg-black/15'
const nameStyles = 'text-xl font-bold text-emerald-400'
const emailStyles = 'text-gray-200 font-thin'
const dateLabelStyles = 'text-gray-200 font-thin'
const dateTextStyles = 'text-gray-200 font-thin'
const buttonBaseStyles = 'flex justify-center items-center border rounded-2xl p-1 gap-1 transition-all duration-200 font-thin'
const editButtonStyles = `${buttonBaseStyles} hover:bg-emerald-950 border-emerald-500 text-emerald-500`
const deleteButtonStyles = `${buttonBaseStyles} hover:bg-red-950 border-red-500 text-red-500`

/**
 * Componente para mostrar la información del perfil de un usuario.
 * Realiza una petición a la API para obtener los datos del usuario autenticado
 * y los muestra en una tarjeta de perfil.
 * @returns {JSX.Element} La tarjeta con la información del perfil del usuario.
 */
export const InfoPerfil = () => {
  const [user, setUser] = useState(null)
  const [fecha, setFecha] = useState(null)
  const [loading, setLoading] = useState(true)

  // Función asíncrona para verificar la autenticación y obtener los datos del perfil.
  useEffect(() => {
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
    <div className={containerStyles}>

      {/* ==========+ Contenedor de informacion de usuario +============ */}

      <div className={cardStyles}>

        {/* Foto de perfil, nombre y correo */}

        <div className='flex items-center gap-3'>
          {/* TODO: añadir logica cuando se integre foto de perfil */}
          <CircleUser size={50} strokeWidth={1} className='text-emerald-500' />

          <div>
            <h1 className={nameStyles}>{user.name}</h1>
            <p className={emailStyles}>{user.email}</p>
          </div>
        </div>

        {/* Fecha de creacion del perfil */}

        <h2 className={dateTextStyles}>
          <span className={dateLabelStyles}>Flicker desde: </span>
          {fecha.toLocaleDateString()}
        </h2>

        {/* Contenedor de botones de editar y eliminar perfil */}

        <div className='flex flex-col w-full gap-2'>

          <button className={editButtonStyles}>
            <Pencil strokeWidth={2} size={17} />
            <span>Editar perfil</span>
          </button>

          <button className={deleteButtonStyles}>
            <TriangleAlert strokeWidth={2} size={18} />
            <span>Eliminar perfil</span>
          </button>
        </div>

      </div>

      {/* ++++++++++++++= Contenedor de listas, contenido y comentarios =+++++++++++++ */}

      <div>
        <p> Listas, contenido y comentarios </p>
      </div>
    </div>
  )
}
