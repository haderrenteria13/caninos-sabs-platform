import React, { useState } from 'react'
import usersApi from '../services/userApi' 

const useDeleteUsers = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteUser = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await usersApi.delete(id)
            return true
        } catch (error) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        deleteUser,
        loading,
        error
    }
}

export default useDeleteUsers
