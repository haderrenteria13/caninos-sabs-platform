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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Compañías</h1>
      <div className="mb-6">
        <FormCompanies
          onSubmit={async (formData) => {
            try {
              const newCompany = await companiesApi.create(formData)
              toast.success('Compañía creada con éxito')
              setCompanies([...companies, newCompany])
            } catch (error) {
              toast.error(error.message)
            }
          }}
        />
      </div>
      {deleteError && (
        <p className="text-red-500 mb-4">
          Error al eliminar la compañía: {deleteError}
        </p>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">NIT</th>
              <th className="py-3 px-6 text-left">Dirección</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left">{company.name}</td>
                <td className="py-3 px-6 text-left">{company.nit}</td>
                <td className="py-3 px-6 text-left">{company.address}</td>
                <td className="py-3 px-6 text-left">{company.phone}</td>
                <td className="py-3 px-6 text-left">{company.email}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setEditingCompany(company)}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      disabled={deletingId === company.id}
                      className={`text-red-500 hover:underline ${deletingId === company.id ? 'opacity-50' : ''
                        }`}
                    >
                      {deletingId === company.id
                        ? 'Eliminando...'
                        : 'Eliminar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingCompany && (
        <div className="mt-6">
          <EditCompanies companyId={editingCompany.id} onSuccess={handleEditSuccess} />
        </div>
      )}
    </div>
  )
}

export default Companies