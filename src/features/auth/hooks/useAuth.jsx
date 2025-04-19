import React, { useState, useEffect } from 'react'
import loginApi from '../services/loginApi'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    if (storedToken && storedEmail) {
      setUser({ email: storedEmail })
    }
  }, [])

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
  }

  return {
    user,
    login,
    logout,
    error
  }
}

export default useAuth