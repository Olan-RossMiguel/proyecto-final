import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Layout from '../src/layouts/Layout' // ← Nuevo componente
import { Profile } from './pages/Profile'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas PÚBLICAS (sin Navbar) */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Rutas PROTEGIDAS (con Navbar) */}
        <Route
          path='/' element={
            <Layout>
              <Home />
            </Layout>
        }
        />

        {/* Cuando agregues más rutas, las pones aquí con Layout */}
        {/*
        <Route path='/movies/:id' element={
          <Layout>
            <MovieDetail />
          </Layout>
        } /> */}

        <Route
          path='/profile' element={
            <Layout>
              <Profile />
            </Layout>
        }
        />

        {/* Ruta por defecto */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}
