const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3000/api'

/**
 * Función genérica para realizar peticiones a la API.
 * Maneja la configuración de la petición, el cuerpo y las credenciales.
 * Parsea la respuesta como JSON y lanza un error si la petición no es exitosa.
 * @param {string} path - La ruta del endpoint de la API (ej. '/login').
 * @param {object} [options] - Opciones para la petición fetch.
 * @param {string} [options.method='GET'] - El método HTTP a utilizar.
 * @param {object|FormData} [options.body] - El cuerpo de la petición.
 * @returns {Promise<object>} La data de la respuesta en formato JSON.
 * @throws {Error} Lanza un error si la respuesta de la red no es 'ok'.
 */
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

/**
 * Objeto que agrupa los endpoints de la API para un uso más sencillo.
 */
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
