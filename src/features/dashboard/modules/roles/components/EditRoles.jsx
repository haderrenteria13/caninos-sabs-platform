import React, { useState, useEffect } from 'react'
import rolesApi from '../services/rolesApi'
import FormRoles from './FormRoles'
import { toast } from 'react-toastify'

const EditRole = ({ roleId, onSuccess }) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const data = await rolesApi.getForID(roleId)
                setRole(data)
            } catch (error) {
                toast.error('Error al cargar el rol')
            }
        }

        fetchRole()
        
    }, [roleId])

    const handleEdit = async (formData) => {
        try {
            await rolesApi.update(roleId, formData)
            if (onSuccess) onSuccess()
        } catch (error) {
           toast.error(error.message)
        }
    }

    if (!role) {
        return <p>Cargando datos del rol...</p>
    }

    return (
        <div>
            <h2>Editar Rol</h2>
            <FormRoles role={role} onSubmit={handleEdit} />
        </div>
    )
}

export default EditRole