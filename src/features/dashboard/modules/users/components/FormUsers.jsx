import React, { useState } from 'react'

const FormUsers = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', roleId: '', companyId: '', })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
            alert('Usuario registrado correctamente')
            setFormData({ fullName: '', email: '', password: '', roleId: '', companyId: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre Completo:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Rol ID:</label>
                <input type="number" name="roleId" value={formData.roleId} onChange={handleChange} required />
            </div>
            <div>
                <label>Compañía ID:</label>
                <input type="number" name="companyId" value={formData.companyId} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Usuario'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FormUsers