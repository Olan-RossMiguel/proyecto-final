import {
  Loader,
  CircleUser,
  TriangleAlert,
  PencilLine,
  Mail,
  Clock,
  LoaderCircle,
  Check,
} from 'lucide-react'
import { api } from '../api/client'
import { useState, useEffect } from 'react'
import { ModalVerificarAuth } from './ModalVerificarAuth'
import { useNavigate } from 'react-router-dom'
import { LoadingFullAbs } from './LoadingFullAbs'
import { AlertModalFull } from './AlertModalFull'

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
  const [form, setForm] = useState(null)
  const [fecha, setFecha] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [messageModal, setMessageModal] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingMail, setIsEditingMail] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setLoadingModal(true)
      await api.actualize(user.id, form)
      setLoadingModal(false)
      setMessageModal(true)
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
    } finally {
      navigate(0)
    }
  }
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
        <LoaderCircle className='animate-spin' size={50} />
      </div>
    )
  }

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className={containerStyles}>
        {/* Renderizado condicional de modal */}
        {isModalOpen && (
          <ModalVerificarAuth
            user={user}
            closeModal={() => setIsModalOpen(false)}
          />
        )}

        {/* ==========+ Contenedor de informacion de usuario +============ */}
        <div className={cardStyles} onSubmit={formHandler}>
          {/* Foto de perfil, nombre y correo */}
          <div className='flex items-center gap-3'>
            {loadingModal && <LoadingFullAbs />}
            {messageModal && <AlertModalFull text='Perfil actualizado' />}
            {/* TODO: añadir logica cuando se integre foto de perfil */}
            <CircleUser size={50} strokeWidth={1} />

            <div>
              <div className='flex text-center align-center justify-between items-center gap-3 border-b border-gray-800 px-2'>
                {!isEditingName
                  ? (
                    <h1 className={nameStyles}>{user.name}</h1>
                    )
                  : (
                    <input
                      name='name'
                      type='text'
                      className={nameStyles}
                      placeholder={user.name}
                      onChange={onChange}
                      size={user.name.length - 3}
                    />
                    )}
                {!isEditingName
                  ? (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className={editButtonStyles}
                      type='button'
                    >
                      <span>Editar</span>
                      <span>
                        <PencilLine strokeWidth={2} size={15} />
                      </span>
                    </button>
                    )
                  : (
                    <button
                      onClick={() => { setIsEditingName(false); handleSubmit() }}
                      className={editButtonStyles}
                      type='submit'
                    >
                      <span>Confirmar</span>
                      <span>
                        <Check strokeWidth={3} size={15} />
                      </span>
                    </button>
                    )}
              </div>

              {/* Email Edit. */}
              {/* TODO agregar verificacion */}
              <div className='flex items-center justify-between w-full'>
                {!isEditingMail
                  ? (
                    <h1 className={emailStyles}>{user.email}</h1>
                    )
                  : (
                    <input
                      name='email'
                      type='email'
                      className={`${emailStyles} text-white`}
                      placeholder={user.email}
                      onChange={onChange}
                      size={user.email.length - 4}
                    />
                    )}
                {!isEditingMail
                  ? (
                    <button
                      onClick={() => setIsEditingMail(true)}
                      className={editButtonStyles}
                      type='button'
                    >
                      <span>Editar</span>
                      <span className='mr-2'>
                        <Mail
                          strokeWidth={2}
                          size={15}
                        />
                      </span>
                    </button>
                    )
                  : (
                    <button
                      onClick={() => { setIsEditingMail(false); handleSubmit() }}
                      className={editButtonStyles}
                      type='submit'
                    >
                      <span>Confirmar</span>
                      <span>
                        <Check strokeWidth={3} size={15} />
                      </span>
                    </button>
                    )}
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
            <button
              className={deleteButtonStyles}
              onClick={() => setIsModalOpen(true)}
            >
              <TriangleAlert strokeWidth={2} size={18} />
              <span>Eliminar perfil</span>
            </button>
          </div>
        </div>

        {/* ++++++++++++++= Contenedor de listas, contenido y comentarios =+++++++++++++ */}

      </div>
    </>
  )
}
