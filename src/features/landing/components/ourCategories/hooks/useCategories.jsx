import React, { useEffect, useState } from 'react'
import categoriesApi from '../../../../dashboard/modules/categories/services/categoriesApi'
const useCategories = () => {
    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState (true)
    const [error, setError] = useState (false)

    useEffect (() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesApi.getAll()
                setCategories(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return {
        categories,
        loading,
        error
    }
}

export default useCategories