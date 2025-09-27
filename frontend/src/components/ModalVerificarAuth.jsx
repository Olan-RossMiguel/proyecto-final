import { CircleX, TriangleAlert, UserX, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../api/client'

// --- Clases de estilo para Tailwind CSS ---

const buttonBaseStyles =
  'flex justify-center items-center border rounded-2xl p-1 gap-1 transition-all duration-200'
const editButtonStyles = `${buttonBaseStyles} text-sm text-gray-600 font-medium hover:cursor-pointer hover:text-emerald-500 border-none rounded-xl`
const deleteButtonStyles = `${buttonBaseStyles} hover:bg-red-600 bg-red-950 border-red-600 text-white font-medium w-full flex items-center gap-2`

export const ModalVerificarAuth = ({ user, closeModal }) => {
  const handleDelete = async () => {
    const res = await api.delete(user.id)
    console.log(res)
    closeModal()
  }
  const [isVisible, setIsVisible] = useState(false)

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
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-3 text-red-600'>
            <TriangleAlert strokeWidth={2} size={24} />
            <h1 className='text-xl font-bold text-red-600'>Eliminar cuenta</h1>
          </div>
          <button onClick={handleClose} className={editButtonStyles}>
            <CircleX strokeWidth={1} size={25} />
          </button>
        </div>

        <p className='text-gray-300 mb-2'>¿Estás seguro de que quieres eliminar la cuenta de <strong className='font-semibold text-white'>{user.name}</strong>? Esta acción no se puede deshacer.</p>
        <p className='text-gray-400 text-sm italic mb-6'>Perderás toda tu información, listas y comentarios. Tendrás que autenticarte de nuevo para confirmar.</p>

        <button className={deleteButtonStyles} onClick={handleDelete}>
          <UserX size={18} strokeWidth={3} />
          Sí, eliminar mi cuenta
        </button>
      </div>
    </div>
  )
}
