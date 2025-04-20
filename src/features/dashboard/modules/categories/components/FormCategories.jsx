import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const FormCategories = ({ category = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (category) {
            setFormData({ name: category.name, description: category.description })
        }
    }, [category])

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
                category ? (
                    toast.done('Categoria actualizada con éxito')
                ) : (
                    toast.done('Categoria creada con éxito')
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
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 space-y-5 w-full max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-indigo-600 text-center">
        {category ? 'Editar Categoría' : 'Crear Categoría'}
    </h2>

    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre:</label>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre de la categoría"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
    </div>

    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción:</label>
        <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe la categoría"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
        />
    </div>

    {error && <p className="text-red-500 text-sm">{error}</p>}

    <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
    >
        {loading
            ? (category ? 'Actualizando...' : 'Creando...')
            : (category ? 'Actualizar Categoría' : 'Crear Categoría')}
    </button>
</form>

    )
}

export default FormCategories