import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      }
  }

  return (
    <div>
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form >
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Auth