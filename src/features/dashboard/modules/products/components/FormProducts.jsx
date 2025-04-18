import React, { useState, useEffect } from 'react'
import useGetCategories from '../../categories/hooks/useGetCategories'

const FormProducts = ({ product = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', description: '', count: 0, stock: 0, price: 0.0, imageUrl: '', categoryId: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { categories, loading: loadingCategories, error: errorCategories } = useGetCategories()

    useEffect(() => {
        if (product) {
            setFormData({ name: product.name, description: product.description, count: product.count, stock: product.stock, price: product.price, imageUrl: product.imageUrl, categoryId: product.categoryId })
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
            alert(product ? 'Producto actualizado con éxito' : 'Producto creado con éxito')
            setFormData({ name: '', description: '', count: 0, stock: 0, price: 0.0, imageUrl: '', categoryId: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Descripción:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Cantidad:</label>
                <input type="number" name="count" value={formData.count} onChange={handleChange} required />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>URL de la Imagen:</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </div>
            <div>
                <label>Categoría:</label>
                {loadingCategories ? (
                    <p>Cargando categorías...</p>
                ) : errorCategories ? (
                    <p>Error al cargar categorías: {errorCategories}</p>
                ) : (
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                        <option value="" disabled>Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? (product ? 'Actualizando...' : 'Creando...') : (product ? 'Actualizar Producto' : 'Crear Producto')}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FormProducts