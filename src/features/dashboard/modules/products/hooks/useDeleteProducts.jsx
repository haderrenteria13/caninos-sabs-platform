import React, { useState } from 'react'
import productsApi from '../services/productsApi'

const useDeleteProducts = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteProduct = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await productsApi.delete(id)
            return true
        } catch (error) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        deleteProduct,
        loading,
        error
    }
}

export default useDeleteProducts