import { CircleX, TriangleAlert, UserX, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'
import { LoadingFullAbs } from './LoadingFullAbs'
import { AlertModalFull } from './AlertModalFull'

// --- Clases de estilo para Tailwind CSS ---

const buttonBaseStyles =
  'flex justify-center items-center border rounded-2xl p-1 gap-1 transition-all duration-200'
const editButtonStyles = `${buttonBaseStyles} text-sm text-gray-600 font-medium hover:cursor-pointer hover:text-emerald-500 border-none rounded-xl`
const deleteButtonStyles = `${buttonBaseStyles} hover:bg-red-600 bg-red-950 border-red-600 text-white font-medium w-full flex p-1.5 mt-1 items-center gap-2`

export const ModalVerificarAuth = ({ user, closeModal }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    await api.delete(user.id)
    setDeleteSucces(true)
    api.logout()
    setTimeout(() => {
      navigate('/login')
    }, 3000)
  }
  const [isVisible, setIsVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  // ========== Logica de verificacion =============
  // ?seria buena idea portear la logia a un custom hook?
  // Mensaje de error en login
  const [error, setError] = useState('')
  // Seteamos el target actual con la informacion actual, llamando por el mismo label. brillante funcion, salio de la logica de login.
  const [form, setForm] = useState({ email: user.email, password: '' })
  const [deleteSucces, setDeleteSucces] = useState(false)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.login(form)
      handleDelete()
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
      setLoading(false)
    }
  }

  // Efecto para la animación de entrada del modal
  useEffect(() => {
    // Pequeño retraso para asegurar que el navegador aplique las clases de transición
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10) // Un pequeño delay es suficiente

    return () => clearTimeout(timer)
  }, [])

  // Función para manejar el cierre con animación
  const handleClose = () => {
    setIsVisible(false)
    // Esperamos que la transición de salida termine (300ms) antes de llamar a closeModal
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  return (
    // Contenedor del fondo (overlay)
    <div
      className={`fixed inset-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-xl transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose} // Cierra el modal si se hace clic en el fondo
    >
      {/* Contenedor del contenido del modal */}
      <div
        className={`bg-slate-950/70 border backdrop-blur-2xl border-red-500/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 ease-in-out w-full max-w-md mx-4 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        {loading && <LoadingFullAbs />}
        {deleteSucces && <AlertModalFull text='Cuenta eliminada con exito' />}
        {/* Encabezado del modal */}
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-3 text-red-600'>
            <TriangleAlert strokeWidth={2} size={24} />
            <h1 className='text-xl font-bold text-red-600'>Eliminar cuenta</h1>
          </div>

          <button onClick={handleClose} className={editButtonStyles}>
            <CircleX strokeWidth={1} size={25} />
          </button>
        </div>

        <p className='text-gray-300 mb-2'>
          ¿Estás seguro de que quieres eliminar la cuenta de{' '}
          <strong className='font-semibold text-white'>{user.name}</strong>?
          Esta acción no se puede deshacer.
        </p>

        <p className='text-gray-400 text-sm italic'>
          Perderás toda tu información, listas y comentarios. Tendrás que
          autenticarte de nuevo para confirmar.
        </p>

        <form onSubmit={onSubmit} className='mt-5 gap-3 flex flex-col'>
          {error && (
            <p className='text-sm text-red-600 bg-red-900/20 p-2 rounded'>
              {error}
            </p>
          )}
          <input
            type='email'
            name='email'
            value={user.email}
            readOnly
            disabled
            required
            className='mt-1 w-full rounded-2xl border border-red-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-100 italic text-center'
          />
          <input
            type='password'
            name='password'
            placeholder='Confirma tu contraseña'
            onChange={onChange}
            required
            className='mt-1 w-full rounded-2xl border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
          />

          <button
            className={
              deleteButtonStyles + (loading === true ? 'animate-pulse' : null)
            }
            type='submit'
          >
            <UserX size={18} strokeWidth={3} />
            Sí, eliminar mi cuenta
          </button>
        </form>
      </div>
    </div>
  )
}
