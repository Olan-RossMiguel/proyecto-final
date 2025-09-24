import React, { useEffect, useState } from 'react'

export const Profile = () => {
  const [user, setUser] = useState()
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
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    console.log('User:', user)
  }, [user])

  return (
    <>
      <div className='fixed inset-0 w-full h-full bg-white dark:bg-gray-950'>
        <svg
          className='absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.07]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <filter id='noise'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.65'
              numOctaves={3}
              stitchTiles='stitch'
            />
            <feColorMatrix type='saturate' values={0} />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,246,228,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%)]'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(253,224,71,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(250,204,21,0.08),transparent_40%)]' />
        </div>
      </div>
      <div />
    </>
  )
}
