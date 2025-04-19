import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useGetCompanies from '../../companies/hooks/useGetCompanies'
import useGetRoles from '../../roles/hooks/useGetRoles'

const FormUsers = ({ user = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        password: '',
        roleId: user?.roleId || '',
        companyId: user?.companyId || '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { companies, loading: loadingCompanies, error: errorCompanies } = useGetCompanies()
    const { roles, loading: loadingRoles, error: errorRoles } = useGetRoles()

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName,
                email: user.email,
                password: '',
                roleId: user.roleId,
                companyId: user.companyId,
            })
        }
    }, [user])

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
            toast.done('Usuario registrado correctamente')
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
                <label>Rol:</label>
                {loadingRoles ? (
                    <p>Cargando roles...</p>
                ) : errorRoles ? (
                    <p>Error al cargar roles: {errorRoles}</p>
                ) : (
                    <select name="roleId" value={formData.roleId} onChange={handleChange} required>
                        <option value="" disabled>Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div>
                <label>Compañía:</label>
                {loadingCompanies ? (
                    <p>Cargando compañías...</p>
                ) : errorCompanies ? (
                    <p>Error al cargar compañías: {errorCompanies}</p>
                ) : (
                    <select name="companyId" value={formData.companyId} onChange={handleChange} required>
                        <option value="" disabled>Seleccione una compañía</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? (user ? 'Actualizando...' : 'Creando...') : (user ? 'Actualizar Usuario' : 'Crear Usuario')}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FormUsers