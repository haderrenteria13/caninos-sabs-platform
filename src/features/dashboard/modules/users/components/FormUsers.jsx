import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useGetCompanies from '../../companies/hooks/useGetCompanies'
import useGetRoles from '../../roles/hooks/useGetRoles'

const FormUsers = ({ user = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        password: '',
        roleId: user?.roleId || '',
        companyId: user?.companyId || '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { companies, loading: loadingCompanies, error: errorCompanies } = useGetCompanies()
    const { roles, loading: loadingRoles, error: errorRoles } = useGetRoles()

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName,
                email: user.email,
                password: '',
                roleId: user.roleId,
                companyId: user.companyId,
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await onSubmit(formData)
            toast.done('Usuario registrado correctamente')
            setFormData({ fullName: '', email: '', password: '', roleId: '', companyId: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
  onSubmit={handleSubmit}
  className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl mx-auto"
>
  <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
    {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
  </h2>

  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo:</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        placeholder="Nombre completo"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Contraseña"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Rol:</label>
      {loadingRoles ? (
        <p className="text-sm text-gray-500">Cargando roles...</p>
      ) : errorRoles ? (
        <p className="text-red-500 text-sm">Error al cargar roles: {errorRoles}</p>
      ) : (
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>Seleccione un rol</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      )}
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Compañía:</label>
      {loadingCompanies ? (
        <p className="text-sm text-gray-500">Cargando compañías...</p>
      ) : errorCompanies ? (
        <p className="text-red-500 text-sm">Error al cargar compañías: {errorCompanies}</p>
      ) : (
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>Seleccione una compañía</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      )}
    </div>
  </div>

  {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

  <button
    type="submit"
    disabled={loading}
    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
  >
    {loading
      ? user
        ? 'Actualizando...'
        : 'Creando...'
      : user
      ? 'Actualizar Usuario'
      : 'Crear Usuario'}
  </button>
</form>

    )
}

export default FormUsers