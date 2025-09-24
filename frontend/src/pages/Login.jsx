import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { api } from '../api/client'

export default function Login () {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.login(form)
      nav('/')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title='Inicia sesión'
      footer={
        <>
          ¿No tienes cuenta?{' '}
          <Link to='/register' className='font-semibold text-blue-600 hover:underline'>
            Crea una aquí
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className='space-y-4'>
        {error && <p className='text-sm text-red-600 bg-red-50 p-2 rounded'>{error}</p>}

        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={onChange}
            required
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='tucorreo@dominio.com'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={onChange}
            required
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='••••••••'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-blue-600 text-white py-2.5 font-semibold hover:bg-blue-700 transition disabled:opacity-60'
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </AuthLayout>
  )
}
