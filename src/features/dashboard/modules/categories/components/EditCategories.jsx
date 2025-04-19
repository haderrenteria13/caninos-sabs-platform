import React, { useState, useEffect } from 'react'
import categoriesApi from '../services/categoriesApi'
import FormCategories from './FormCategories'
import { toast } from 'react-toastify'

const EditCategory = ({ categoryId, onSuccess }) => {
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await categoriesApi.getForID(categoryId)
                setCategory(data)
            } catch (error) {
                toast.error('Error al cargar la categoria')
            }
        }

        fetchCategory()
        
    }, [categoryId])

    const handleEdit = async (formData) => {
        try {
            await categoriesApi.update(categoryId, formData)
            if (onSuccess) onSuccess()
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (!category) {
        return <p>Cargando datos de la categoría...</p>
    }

    return (
        <div>
            <h2>Editar Categoría</h2>
            <FormCategories category={category} onSubmit={handleEdit} />
        </div>
    )
}

export default EditCategory