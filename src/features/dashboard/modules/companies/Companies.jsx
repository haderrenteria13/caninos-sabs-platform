import React, { useState, useEffect } from 'react'
import useGetCompanies from './hooks/useGetCompanies'
import useDeleteCompanies from './hooks/useDeleteCompanies'
import FormCompanies from './components/FormCompanies'
import EditCompanies from './components/EditCompanies'
import companiesApi from './services/companiesApi'
import { toast } from 'react-toastify'
import { Dialog } from '@headlessui/react'

const Companies = () => {
  const { companies: initialCompanies, error, loading } = useGetCompanies()
  const { deleteCompanies, error: deleteError } = useDeleteCompanies()
  const [companies, setCompanies] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingCompany, setEditingCompany] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    setCompanies(initialCompanies)
  }, [initialCompanies])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar esta empresa?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteCompanies(id)
      if (success) {
        toast.success('Empresa eliminada correctamente')
        setCompanies((prev) => prev.filter((company) => company.id !== id))
      } else {
        toast.error('Error al eliminar la empresa')
      }
      setDeletingId(null)
    }
  }

  const handleEditSuccess = async () => {
    try {
      const updatedCompanies = await companiesApi.getAll()
      setCompanies(updatedCompanies)
      toast.success('Empresa actualizada con éxito')
    } catch (error) {
      toast.error('Error al actualizar la lista de compañías')
    }
    setEditingCompany(null)
    setIsEditModalOpen(false) // Cierra el modal después de editar
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 "></div>
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Empresas</h1>
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Crear Empresa
        </button>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <FormCompanies
              onSubmit={async (formData) => {
                try {
                  const newCompany = await companiesApi.create(formData)
                  const updatedCompanies = await companiesApi.getAll()
                  setCompanies(updatedCompanies)
                  toast.success('Compañía creada con éxito')
                  setIsModalOpen(false)
                } catch (error) {
                  toast.error(error.message)
                }
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
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
                      onClick={() => {
                        setEditingCompany(company)
                        setIsEditModalOpen(true)
                      }}
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
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
            {editingCompany && (
              <FormCompanies
                company={editingCompany}
                onSubmit={async (formData) => {
                  try {
                    await companiesApi.update(editingCompany.id, formData)
                    handleEditSuccess()
                  } catch (error) {
                    toast.error(error.message)
                  }
                }}
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default Companies