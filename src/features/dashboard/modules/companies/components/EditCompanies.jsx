import React, { useState, useEffect } from 'react'
import companiesApi from '../services/companiesApi'
import FormCompanies from './FormCompanies'

const EditCompanies = ({ companyId, onSuccess }) => {
    const [company, setCompany] = useState(null)

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const data = await companiesApi.getForID(companyId)
                setCompany(data)
            } catch (error) {
                alert('Error al cargar la empresa')
            }
        }

        fetchCompany()
        
    }, [companyId])

    const handleEdit = async (formData) => {
        try {
            await companiesApi.update(companyId, formData)
            if (onSuccess) onSuccess()
        } catch (error) {
            alert(error.message)
        }
    }

    if (!company) {
        return <p>Cargando datos de la empresa...</p>
    }

    return (
        <div>
            <h2>Editar Empresa</h2>
            <FormCompanies company={company} onSubmit={handleEdit} />
        </div>
    )
}

export default EditCompanies