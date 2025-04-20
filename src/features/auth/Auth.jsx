import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dog, Eye, EyeOff } from 'lucide-react'

const Auth = () => {
  const { login, error, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await login(email, password)
    setLoading(false)
    if (success) {
      navigate('/dashboard')
    }
  }

  if (isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center'>
          <div className='space-y-4'>
            <div className='flex justify-center'>
              <Dog className='h-12 w-12 text-orange-500' />
            </div>
            <h1 className='text-2xl font-bold'>Ya estás logueado</h1>
            <p className='text-gray-600'>Accede directamente al panel administrativo.</p>
            <NavLink to="/dashboard" className='mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600'>
              Ir al Dashboard
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <div className='space-y-4 text-center'>
          <div className='flex justify-center'>
            <Dog className='h-12 w-12 text-orange-500' />
          </div>
          <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
          <p className='text-gray-600'>Accede al panel administrativo de Caninos SABS</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6 mt-6'>
          {error && <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded'>{error}</div>}
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Correo Electrónico</label>
            <input id="email" type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm' />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Contraseña</label>
            <div className='relative'>
              <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm' />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit" className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'}`} disabled={loading}>
            {loading ? (
              <span className='flex items-center'>
                <span className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2'></span>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <NavLink to="/landing" className='text-sm text-gray-600 hover:text-orange-500'>
            Volver a la página principal
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Auth