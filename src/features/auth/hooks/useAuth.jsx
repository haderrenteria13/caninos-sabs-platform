import React, { useState } from 'react'
import loginApi from '../services/loginApi'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    try {
      const { token } = await loginApi(email, password)
      localStorage.setItem('token', token)
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