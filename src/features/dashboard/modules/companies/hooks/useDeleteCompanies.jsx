import React, { useState } from "react";
import companiesApi from "../services/companiesApi";

const useDeleteCompanies = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteCompanies = async (id) => {
        setLoading(true)
        setError(null)
        try {
            await companiesApi.delete(id)
            return true
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        deleteCompanies,
        loading,
        error,
    }
}

export default useDeleteCompanies