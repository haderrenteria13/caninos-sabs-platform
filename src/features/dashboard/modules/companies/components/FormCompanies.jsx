import React, { useState, useEffect } from 'react'

const FormCompanies = ({ company = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', nit: '', address: '', phone: '', email: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (company) {
            setFormData({ name: company.name, nit: company.nit, address: company.address, phone: company.phone, email: company.email })
        }
    }, [company])

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
            alert(company ? 'Empresa actualizada con éxito' : 'Empresa creada con éxito')
            setFormData({ name: '', nit: '', address: '', phone: '', email: '' })
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
  <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
    {company ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Nombre de la empresa"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">NIT:</label>
      <input
        type="text"
        name="nit"
        value={formData.nit}
        onChange={handleChange}
        required
        placeholder="NIT de la empresa"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder="Dirección física"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono:</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        placeholder="Número de contacto"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="correo@empresa.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

  <button
    type="submit"
    disabled={loading}
    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
  >
    {loading
      ? company
        ? 'Actualizando...'
        : 'Creando...'
      : company
      ? 'Actualizar Empresa'
      : 'Crear Empresa'}
  </button>
</form>


    )
}

export default FormCompanies