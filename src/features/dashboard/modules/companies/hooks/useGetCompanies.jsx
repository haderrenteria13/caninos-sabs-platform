import React, { useEffect, useState } from 'react'
import companiesApi from '../services/companiesApi'

const useGetCompanies = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        const data = await companiesApi.getAll()
        setCompanies(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCompanies()
  }, [])

  return {
    companies,
    loading,
    error
  }
}

export default useGetCompanies