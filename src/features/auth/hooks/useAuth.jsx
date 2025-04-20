import React, { useState, useEffect } from 'react'
import loginApi from '../services/loginApi'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoggedOut, setIsLoggedOut] = useState(false) // Nuevo estado

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    if (storedToken && storedEmail) {
      setUser({ email: storedEmail })
    }
  }, [])

  const isAuthenticated = !!user

  const login = async (email, password) => {
    try {
      const { token } = await loginApi(email, password)
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      setUser({ email })
      setError(null)
      return true
    } catch (error) {
      setError(error.message)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setUser(null)
    setIsLoggedOut(true) // Actualiza el estado
  }

  return {
    user,
    login,
    logout,
    error,
    isAuthenticated,
    isLoggedOut // Exporta el nuevo estado
  }
}

export default useAuth