import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const register = async (userData: any) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData)
  return response.data
}

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
  return response.data
}