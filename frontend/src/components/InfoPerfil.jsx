import {
  Loader,
  CircleUser,
  TriangleAlert,
  Pencil,
  PencilLine,
  Mail,
  Popcorn,
  Clock,
} from 'lucide-react'
import { api } from '../api/client'
import { useState, useEffect } from 'react'
import { ModalVerificarAuth } from './ModalVerificarAuth'

// --- Clases de estilo para Tailwind CSS ---
const containerStyles =
  'w-full px-10 py-10 rounded-xl border border-black flex justify-center items-center gap-10'
const cardStyles =
  'flex flex-col justify-center items-start gap-2 rounded-2xl px-4 py-3 hover:shadow-2xl/90 transition-all duration-400 shadow-xl/40 border border-black bg-black/15'
const nameStyles = 'text-xl font-bold text-white w-auto min-w-0'
const emailStyles = 'text-gray-600 font-medium px-2'
const dateLabelStyles = 'text-gray-200 font-normal'
const dateTextStyles = 'text-gray-200 font-bold'
const buttonBaseStyles =
  'flex justify-center items-center border rounded-2xl p-1 gap-1 transition-all duration-200'
const editButtonStyles = `${buttonBaseStyles} text-sm text-gray-600 font-medium hover:cursor-pointer hover:text-emerald-500 border-none rounded-xl`
const deleteButtonStyles = `${buttonBaseStyles} hover:bg-red-950 border-red-600 text-red-600`

const formHandler = (e) => {
  e.preventDefault()
}

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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>

      <div className={containerStyles}>
        {/* Renderizado condicional de modal */}
        {isModalOpen && <ModalVerificarAuth user={user} closeModal={() => setIsModalOpen(false)} />}

        {/* ==========+ Contenedor de informacion de usuario +============ */}
        <form className={cardStyles} onSubmit={formHandler}>
          {/* Foto de perfil, nombre y correo */}

          <div className='flex items-center gap-3'>
            {/* TODO: añadir logica cuando se integre foto de perfil */}
            <CircleUser size={50} strokeWidth={1} />

            <div>
              <div className='flex text-center align-center justify-center gap-3 border-b border-gray-800 px-2'>
                <input
                  type='text'
                  className={nameStyles}
                  value={user.name}
                  placeholder={user.name}
                  size={user.name.length - 3 || 1}
                />
                <button className={editButtonStyles}>
                  <span>
                    <PencilLine strokeWidth={2} size={15} />
                  </span>
                  <span>Editar</span>
                </button>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className={emailStyles}>{user.email}</p>
                <Mail
                  strokeWidth={2}
                  size={15}
                  className='text-gray-600 mr-3'
                />
              </div>
            </div>
          </div>

          {/* Fecha de creacion del perfil */}
          <div className='flex text-center align-center items-center justify-between w-full gap-1 animate-sparkle'>
            <div className='flex text-center align-center items-center gap-1'>
              <Clock strokeWidth={2} size={13} />
              <span className={dateLabelStyles}>Flicker desde: </span>
            </div>
            <h2 className={dateTextStyles}>{fecha.toLocaleDateString()}</h2>
          </div>

          {/* Contenedor de botones de editar y eliminar perfil */}

          <div className='flex flex-col w-full gap-2 '>
            <button className={deleteButtonStyles} onClick={() => setIsModalOpen(true)}>
              <TriangleAlert strokeWidth={2} size={18} />
              <span>Eliminar perfil</span>
            </button>
          </div>
        </form>

        {/* ++++++++++++++= Contenedor de listas, contenido y comentarios =+++++++++++++ */}

        <div>
          <p> Listas, contenido y comentarios </p>
        </div>
      </div>
    </>
  )
}
