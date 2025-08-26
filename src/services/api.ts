import axios from 'axios'

//const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const apiLocalUrl = import.meta.env.VITE_API_LOCAL_URL

console.log(apiLocalUrl)

const api = axios.create({
  baseURL: apiLocalUrl,
  withCredentials: true,
})

export default api
