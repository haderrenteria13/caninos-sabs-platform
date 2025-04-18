import React, { useState, useEffect } from 'react'

const FormCompanies = ({ company = null, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', nit: '', address: '', phone: '', email: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (company) {
            setFormData({ name: company.name, nit: company.nit, address: company.address, phone: company.phone, email: company.email })
        }
    }, [company])

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
            alert(company ? 'Empresa actualizada con éxito' : 'Empresa creada con éxito')
            setFormData({ name: '', nit: '', address: '', phone: '', email: '' })
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
                <label>NIT:</label>
                <input type="text" name="nit" value={formData.nit} onChange={handleChange} required />
            </div>
            <div>
                <label>Dirección:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? (company ? 'Actualizando...' : 'Creando...') : (company ? 'Actualizar Empresa' : 'Crear Empresa')}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FormCompanies