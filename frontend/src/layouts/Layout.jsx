import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Loader } from 'lucide-react'

export default function Layout ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth () {
      try {
        const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api'
        const res = await fetch(`${API_BASE}/profile`, {
          credentials: 'include'
        })

        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api'
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      setIsAuthenticated(false)
      setUser(null)
      window.location.href = '/login'
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-black'>
        <div className='flex items-center justify-center min-h-screen'>
          <Loader className='animate-spin text-emerald-600' size={150} />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      {/* MAIN SIN padding-top - las cards pegadas a la navbar */}
      <main className='pt-0'>
        {children}
      </main>
    </div>
  )
}
