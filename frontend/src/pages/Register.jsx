import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { api } from '../api/client'

export default function Register () {
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    try {
      await api.register({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      nav('/login')
    } catch (err) {
      setError(err.message || 'No se pudo registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title='Crear cuenta de FlickPick'
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link
            to='/login'
            className='font-semibold text-emerald-600 hover:underline'
          >
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className='space-y-4'>
        {error && (
          <p className='text-sm text-red-600 bg-red-50 p-2 rounded'>{error}</p>
        )}

        <div>
          <label className='block text-sm font-medium text-gray-300'>
            Nombre
          </label>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={onChange}
            required
            className='mt-1 w-full rounded-lg border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
            placeholder='Tu nombre'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-300'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={onChange}
            required
            className='mt-1 w-full rounded-lg border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
            placeholder='tucorreo@dominio.com'
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={onChange}
              required
              minLength={6}
              className='mt-1 w-full rounded-lg border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-300'>
              Confirmar
            </label>
            <input
              type='password'
              name='password2'
              value={form.password2}
              onChange={onChange}
              required
              minLength={6}
              className='mt-1 w-full rounded-lg border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-emerald-600 text-white py-2.5 font-semibold hover:bg-emerald-700 transition disabled:opacity-60'
        >
          {loading ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>
    </AuthLayout>
  )
}
