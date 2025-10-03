import axios from 'axios'

const API_BASE_URL = import.meta.env.PROD
  ? 'https://mileapp-fullstack-production.up.railway.app'
  : 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api