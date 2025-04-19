import React, { useState, useEffect } from 'react'
import usersApi from '../services/usersApi'
import FormUser from './FormUser' // Este componente es el formulario que usas para editar

const EditUser = ({ userId, onSuccess }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await usersApi.getForID(userId)
                setUser(data)
            } catch (error) {
                alert('Error al cargar el usuario')
            }
        }

        fetchUser()
    }, [userId])

    const handleEdit = async (formData) => {
        try {
            await usersApi.update(userId, formData)
            alert('Usuario actualizado correctamente')
            if (onSuccess) onSuccess()
        } catch (error) {
            alert(error.message)
        }
    }

    if (!user) {
        return <p>Cargando datos del usuario...</p>
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <FormUser user={user} onSubmit={handleEdit} />
        </div>
    )
}

export default EditUser
