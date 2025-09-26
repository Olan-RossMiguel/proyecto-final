const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api'

async function request (path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data
  try { data = text ? JSON.parse(text) : {} } catch { data = { message: text } }

  if (!res.ok) {
    const msg = data?.message || `Error ${res.status}`
    throw new Error(msg)
  }
  return data
}

export const api = {
  login: (payload) => request('/login', { method: 'POST', body: payload }),
  register: (payload) => request('/register', { method: 'POST', body: payload }),

  // Esta ruta hace referencia el archivo authRoutes. Y es un metodo para consumir la
  // info de usuario y esta protegida pues revisa token.
  // Antes apuntaba a /me, pero esa ruta no exista e intuyo que su proposito era
  // acceder a la info de usuario.
  profile: () => request('/profile'),

  logout: () => request('/logout', { method: 'POST' }),
}
