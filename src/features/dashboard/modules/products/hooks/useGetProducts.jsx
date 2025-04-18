import { useEffect, useState } from 'react'
import productsApi from '../services/productsApi'

const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll()
        setProducts(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error
  }
}

export default useGetProducts