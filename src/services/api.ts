import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const apiLocalUrl = import.meta.env.VITE_API_LOCAL_URL

const api = axios.create({
  baseURL: apiBaseUrl // ou apiBaseUrl dependendo do ambiente
})

export default api