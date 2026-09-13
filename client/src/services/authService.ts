import axios from 'axios'

const getApiBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  return 'http://localhost:5001/api' // Updated to use port 5001
}

const API_BASE_URL = getApiBaseUrl()

export const register = async (userData: any) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData)
  return response.data
}

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
  return response.data
}