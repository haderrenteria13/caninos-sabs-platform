import { useState } from 'react'
import categoriesApi from '../services/categoriesApi'

const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteCategory = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await categoriesApi.delete(id)
            return true
        } catch (error) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        deleteCategory,
        loading,
        error,
    }
}

export default useDeleteCategory