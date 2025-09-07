import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'

function Home () { return <h2>Home</h2> }
function Login () { return <h2>Login</h2> }
function About () { return <h2>About</h2> }

export default function App () {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ paddingTop: '80px', textAlign: 'center' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
