import React, { useState, useEffect } from 'react'
import productsApi from '../services/productsApi'
import FormProducts from './FormProducts'

const EditProducts = ({ productId, onSuccess }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productsApi.getForID(productId)
                setProduct(data)
            } catch (error) {
                alert('Error al cargar el producto')
            }
        }

        fetchProduct()

    }, [productId])

    const handleEdit = async (formData) => {
        try {
            await productsApi.update(productId, formData)
            if (onSuccess) onSuccess()
        } catch (error) {
            alert(error.message)
        }
    }

    if (!product) {
        return <p>Cargando datos del producto...</p>
    }

    return (
        <div>
            <h2>Editar Producto</h2>
            <FormProducts product={product} onSubmit={handleEdit} />
        </div>
    )
}

export default EditProducts