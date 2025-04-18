import React, { useState, useEffect } from 'react'
import useGetCompanies from './hooks/useGetCompanies'
import useDeleteCompanies from './hooks/useDeleteCompanies'
import FormCompanies from './components/FormCompanies'
import EditCompanies from './components/EditCompanies'
import companiesApi from './services/companiesApi'

const Companies = () => {
  const { companies: initialCompanies, error, loading } = useGetCompanies()
  const { deleteCompanies, error: deleteError } = useDeleteCompanies()
  const [companies, setCompanies] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingCompany, setEditingCompany] = useState(null)

  useEffect(() => {
    setCompanies(initialCompanies)
  }, [initialCompanies])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar esta empresa?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteCompanies(id)
      if (success) {
        alert('Empresa eliminada correctamente')
        setCompanies((prev) => prev.filter((company) => company.id !== id))
        setDeletingId(null)
      } else {
        alert('Error al eliminar la empresa')
        setDeletingId(null)
      }
    }
  }

  const handleEditSuccess = () => {
    alert('Empresa actualizada con éxito')
    setEditingCompany(null)
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Empresas</h1>
      <FormCompanies
        onSubmit={async (formData) => {
          try {
            const newCompany = await companiesApi.create(formData)
            alert('Empresa creada con éxito')
            setCompanies([...companies, newCompany])
          } catch (error) {
            alert(error.message)
          }
        }} />
      {deleteError && <p style={{ color: 'red' }}>Error al eliminar la empresa: {deleteError}</p>}
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <h2>{company.name}</h2>
            <p>NIT: {company.nit}</p>
            <p>Dirección: {company.address}</p>
            <p>Teléfono: {company.phone}</p>
            <p>Email: {company.email}</p>
            <button onClick={() => handleDelete(company.id)} disabled={deletingId === company.id}>
              {deletingId === company.id ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button onClick={() => setEditingCompany(company)}>Editar</button>
          </li>
        ))}
      </ul>
      {editingCompany && (<EditCompanies companyId={editingCompany.id} onSuccess={handleEditSuccess} />)}
    </div>
  )
}

export default Companies