import { HatGlasses } from 'lucide-react'
import { api } from '../api/client'

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
export const InfoPerfil = ({ user }) => {
  // Convierte la fecha de formato ISO a un objeto Date para poder formatearla.
  const fechaIso = user.createdAt // '2023-10-27T10:00:00.000Z'
  const fecha = new Date(fechaIso)

  //   ? Que hace el metodo me de api
  console.log(api.profile())

  return (
    <div className='w-full px-10 py-10 bg-black/10 rounded-xl border border-slate-800 backdrop-blur-md flex flex-col justify-center items-center'>
      <HatGlasses size={90} strokeWidth={1} />
      <h1 className='text-3xl'>{user.name}</h1>
      <h2 className='italic text-gray-600 pt-3'><span className='text-emerald-600 font-bold'>#Flicker</span> <span className='text-gray-300 font-normal'>desde:</span> {fecha.toLocaleString()}</h2>
      <p className='text-gray-300'>Direccion de correo: {user.email}</p>
    </div>
  )
}
