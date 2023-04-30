import axios from 'axios'

export const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

if (!VITE_BACKEND_BASE_URL) {
    throw new Error('VITE_BACKEND_BASE_URL environment variable not set')
}

const apiClient = axios.create({
    baseURL: `http://${VITE_BACKEND_BASE_URL}`,
    withCredentials: true
})

export default apiClient