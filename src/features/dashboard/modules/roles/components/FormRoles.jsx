import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const FormRoles = ({ role = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (role) {
            setFormData({ name: role.name, description: role.description })
        }
    }, [role])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await onSubmit(formData)
            {
                role ? (
                    toast.done('Rol actualizado con éxito')
                ) : (
                    toast.done('Rol creado con éxito')
                )
            }
            setFormData({ name: '', description: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Descripción:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? (role ? 'Actualizando...' : 'Creando...') : (role ? 'Actualizar Rol' : 'Crear Rol')}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FormRoles