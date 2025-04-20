import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const FormRoles = ({ role = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (role) {
            setFormData({ name: role.name, description: role.description })
        }
    }, [role])

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
            {
                role ? (
                    toast.done('Rol actualizado con éxito')
                ) : (
                    toast.done('Rol creado con éxito')
                )
            }
            setFormData({ name: '', description: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
  onSubmit={handleSubmit}
  className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl mx-auto"
>
  <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
    {role ? 'Editar Rol' : 'Crear Nuevo Rol'}
  </h2>

  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      placeholder="Nombre del rol"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción:</label>
    <input
      type="text"
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
      placeholder="Descripción del rol"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
  >
    {loading
      ? role
        ? 'Actualizando...'
        : 'Creando...'
      : role
      ? 'Actualizar Rol'
      : 'Crear Rol'}
  </button>
</form>

    )
}

export default FormRoles