import React from 'react'
import categoriesApi from '../services/categoriesApi'
import FormCategories from './FormCategories'

const EditCategory = ({ categoryId, onSuccess }) => {
    const [category, setCategory] = React.useState(null)

    React.useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await categoriesApi.getForID(categoryId)
                setCategory(data)
            } catch (error) {
                alert('Error al cargar la categoría')
            }
        }
        fetchCategory()
    }, [categoryId])

    const handleEdit = async (formData) => {
        try {
            await categoriesApi.update(categoryId, formData)
            if (onSuccess) onSuccess()
        } catch (error) {
            alert(error.message)
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