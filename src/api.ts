import axios from 'axios'
import useAuth from './store'

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE || 'http://localhost:5000/api'
})

api.interceptors.request.use(config => {
  const { token } = useAuth.getState()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
