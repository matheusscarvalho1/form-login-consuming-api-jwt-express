import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const apiLocalUrl = import.meta.env.VITE_API_LOCAL_URL

console.log("Base URL: ", apiBaseUrl)
console.log("Local URL: ", apiLocalUrl)

const api = axios.create({
  baseURL: apiBaseUrl // ou apiBaseUrl dependendo do ambiente
})

export default api
