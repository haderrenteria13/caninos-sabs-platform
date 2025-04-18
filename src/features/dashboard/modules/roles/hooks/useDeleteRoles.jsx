import React, { useState } from 'react'
import rolesApi from '../services/rolesApi'

const useDeleteRoles = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteRole = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await rolesApi.delete(id)
            return true
        } catch (error) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        deleteRole,
        loading,
        error
    }
}

export default useDeleteRoles
