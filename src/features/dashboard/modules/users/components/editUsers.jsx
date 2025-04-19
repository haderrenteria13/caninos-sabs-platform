import React, { useState, useEffect } from 'react'
import usersApi from '../services/userApi'
import FormUser from './FormUsers'
import { toast } from 'react-toastify'

const EditUser = ({ userId, onSuccess }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await usersApi.getForID(userId)
                setUser({
                    ...data,
                    companyId: data.companyId || '',
                })
            } catch (error) {
                toast.error('Error al cargar el usuario')
            }
        }

        fetchUser()
    }, [userId])

    const handleEdit = async (formData) => {
        try {
            await usersApi.update(userId, formData)
            toast.done('Usuario actualizado correctamente')
            if (onSuccess) onSuccess()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <h2>Editar Usuario</h2>
            {user ? (
                <FormUser user={user} onSubmit={handleEdit} />
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    )
}

export default EditUser
