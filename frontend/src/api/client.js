const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:3000'

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

export const api = {
  login: (payload) => request('/api/login', { method: 'POST', body: payload }),
  register: (payload) => request('/api/register', { method: 'POST', body: payload }),
  profile: () => request('/api/profile'),
  logout: () => request('/api/logout', { method: 'POST' }),
  delete: (id) => request(`/api/usuarios/${id}`, { method: 'delete' }),
  actualize: (id, payload) => request(`/api/usuarios/${id}`, { method: 'PUT', body: payload }),
}
