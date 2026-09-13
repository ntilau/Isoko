import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister } from '../services/authService'

interface User {
  id: string
  email: string
  role: 'business_owner' | 'investor' | 'advisor' | 'franchise' | 'admin'
  name: string
  token: string
}

interface AuthContextProps {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin({ email, password })
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
        name: response.user.name,
        token: response.token
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error: any) {
      throw new Error('Login failed: ' + (error.response?.data?.error || error.message))
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiRegister(userData)
      const newUser: User = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
        name: response.user.name,
        token: response.token
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
    } catch (error: any) {
      throw new Error('Registration failed: ' + (error.response?.data?.error || error.message))
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}