import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useGetCategories from './hooks/useGetCategories'
import useDeleteCategory from './hooks/useDeleteCategories'
import FormCategories from './components/FormCategories'
import EditCategory from './components/EditCategories'
import categoriesApi from './services/categoriesApi'
import { Dialog } from '@headlessui/react'

const Categories = () => {
  const { categories: initialCategories, error, loading } = useGetCategories()
  const { deleteCategory, error: deleteError } = useDeleteCategory()
  const [categories, setCategories] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    setCategories(initialCategories)
  }, [initialCategories])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar esta categoría?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteCategory(id)
      if (success) {
        toast.success('Categoría eliminada correctamente')
        setCategories((prev) => prev.filter((category) => category.id !== id))
      } else {
        toast.error('Error al eliminar la categoría')
      }
      setDeletingId(null)
    }
  }

  const handleEditSuccess = async () => {
    try {
      const updatedCategories = await categoriesApi.getAll()
      setCategories(updatedCategories)
      toast.success('Categoría actualizada con éxito')
    } catch (error) {
      toast.error('Error al actualizar la lista de categorías')
    }
    setEditingCategory(null)
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Categorías</h1>
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Crear Categoría
        </button>
      </div>
      {deleteError && (
        <p className="text-red-500 mb-4">
          Error al eliminar la categoría: {deleteError}
        </p>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left">{category.name}</td>
                <td className="py-3 px-6 text-left">{category.description}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => {
                        setEditingCategory(category)
                        setIsEditModalOpen(true)
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={deletingId === category.id}
                      className={`text-red-500 hover:underline ${deletingId === category.id ? 'opacity-50' : ''
                        }`}
                    >
                      {deletingId === category.id
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
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <FormCategories
              onSubmit={async (formData) => {
                try {
                  const newCategory = await categoriesApi.create(formData)
                  const updatedCategories = await categoriesApi.getAll()
                  setCategories(updatedCategories)
                  toast.success('Categoría creada con éxito')
                  setIsModalOpen(false)
                } catch (error) {
                  toast.error(error.message)
                }
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
            {editingCategory && (
              <FormCategories
                category={editingCategory}
                onSubmit={async (formData) => {
                  try {
                    await categoriesApi.update(editingCategory.id, formData)
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

export default Categories