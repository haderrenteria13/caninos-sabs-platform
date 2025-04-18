import React, { useEffect, useState } from 'react'
import productsApi from '../../../../dashboard/modules/products/services/productsApi'

const useProducts = () => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState (true)
    const [error, setError] = useState (false)

    useEffect (() => {
        const fetchProduct = async () => {
            try {
                const data = await productsApi.getAll()
                setProducts(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    return {
        products,
        loading,
        error
    }
}

export default useProducts