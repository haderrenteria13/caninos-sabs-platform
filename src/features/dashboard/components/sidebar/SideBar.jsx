import { Dog, LogOut, Users, Package, Tag, Building, Settings, HelpCircle, MessageSquare } from 'lucide-react'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../auth/hooks/useAuth'
import Avvvatars from 'avvvatars-react'

const SideBar = () => {
  const { user, logout, isLoggedOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedOut) {
      navigate('/login') // Redirige al usuario a la página de inicio de sesión
    }
  }, [isLoggedOut, navigate])

  const mainLinks = [
    { name: 'Usuarios', path: '/dashboard/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Roles', path: '/dashboard/roles', icon: <Tag className="h-5 w-5" /> },
    { name: 'Productos', path: '/dashboard/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Categorías', path: '/dashboard/categories', icon: <Tag className="h-5 w-5" /> },
    { name: 'Empresas', path: '/dashboard/companies', icon: <Building className="h-5 w-5" /> },
  ]

  const moreLinks = [
    { name: 'Ayuda', path: '/dashboard/help', icon: <HelpCircle className="h-5 w-5" /> },
  ]

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Dog className="h-7 w-7 text-orange-500" />
          <div>
            <span className="text-2xl font-bold">Caninos SABS</span>
            <p className="text-sm text-gray-400">Panel Administrativo</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">Panel</p>
          <ul className="space-y-2">
            {mainLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
                  {link.icon} <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <p className="text-xs text-gray-400 uppercase mb-2">Más</p>
          <ul className="space-y-2">
            {moreLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
                  {link.icon}<span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex justify-center items-center gap-1 bg-gray-800 p-4 rounded-lg shadow-md'>
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
              logout()
            }
          }}
          className="flex items-center gap-3 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
        <Avvvatars value={user?.email || 'usuario'} size={37} radius={8} />
      </div>
    </aside>
  )
}

export default SideBar