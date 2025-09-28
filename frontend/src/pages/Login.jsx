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
    <>
      <AuthLayout
        title='Inicia sesión en FlickPick'
        footer={
          <>
            ¿No tienes cuenta?{' '}
            <Link to='/register' className='font-semibold text-emerald-600 hover:underline'>
              Crea una aquí
            </Link>
          </>
      }
      >
        <form onSubmit={onSubmit} className='space-y-4'>
          {error && <p className='text-sm text-red-600 bg-red-900/20 p-2 rounded'>{error}</p>}

          <div>
            <label className='block text-sm font-medium text-gray-300'>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={onChange}
              required
              className='mt-1 w-full rounded-2xl border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
              placeholder='tucorreo@dominio.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300'>Contraseña</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={onChange}
              required
              className='mt-1 w-full rounded-2xl border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-400 placeholder:italic placeholder:text-sm bg-transparent text-gray-200'
              placeholder='Contraseña'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-2xl bg-emerald-600 text-white py-2.5 font-semibold hover:bg-emerald-700 transition disabled:opacity-60'
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </AuthLayout>
    </>
  )
}
