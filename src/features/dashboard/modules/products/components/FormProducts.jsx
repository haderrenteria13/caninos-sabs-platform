import React, { useState, useEffect } from 'react'
import useGetCategories from '../../categories/hooks/useGetCategories'
import { toast } from 'react-toastify'

const FormProducts = ({ product = null, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', description: '', stock: 0, price: 0.0, imageUrl: '', categoryId: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { categories, loading: loadingCategories, error: errorCategories } = useGetCategories()

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, description: product.description, stock: product.stock, price: product.price, imageUrl: product.imageUrl, categoryId: product.categoryId })
    }
  }, [product])

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
        product ? (
          toast.done('Producto actualizado con éxito')
        ) : (
          toast.done('Producto creado con éxito')
        )
      }
      setFormData({ name: '', description: '', stock: 0, price: 0.0, imageUrl: '', categoryId: '' })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-5xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {product ? 'Editar Producto' : 'Registrar Nuevo Producto'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-1">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-1">Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Descripción del producto"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-1">Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="Cantidad en inventario"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-1">Precio:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Precio del producto"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-1">URL de la Imagen:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-white mb-1">Categoría:</label>
          {loadingCategories ? (
            <p className="text-gray-500">Cargando categorías...</p>
          ) : errorCategories ? (
            <p className="text-red-500">Error al cargar categorías: {errorCategories}</p>
          ) : (
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
        className="mt-6 w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
      >
        {loading
          ? product
            ? 'Actualizando...'
            : 'Creando...'
          : product
            ? 'Actualizar Producto'
            : 'Crear Producto'}
      </button>
    </form>

  )
}

export default FormProducts