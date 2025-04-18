import { useEffect, useState } from 'react'
import rolesApi from '../services/rolesApi'

const useGetRoles = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await rolesApi.getAll()
        setRoles(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  return { 
    roles,
    loading,
    error
  }
}

export default useGetRoles