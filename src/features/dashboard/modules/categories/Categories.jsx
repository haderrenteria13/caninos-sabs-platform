import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useGetCategories from './hooks/useGetCategories'
import useDeleteCategory from './hooks/useDeleteCategories'
import FormCategories from './components/FormCategories'
import EditCategory from './components/EditCategories'
import categoriesApi from './services/categoriesApi'

const Categories = () => {
  const { categories: initialCategories, error, loading } = useGetCategories()
  const { deleteCategory, error: deleteError } = useDeleteCategory()
  const [categories, setCategories] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)

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
        setDeletingId(null)
      } else {
        toast.error('Error al eliminar la categoría')
        setDeletingId(null)
      }
    }
  }

  const handleEditSuccess = () => {
    toast.success('Categoría actualizada con éxito')
    setEditingCategory(null)
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Categorías</h1>
      <div className="mb-6">
        <FormCategories
          onSubmit={async (formData) => {
            try {
              const newCategory = await categoriesApi.create(formData)
              toast.success('Categoría creada con éxito')
              setCategories([...categories, newCategory])
            } catch (error) {
              toast.error(error.message)
            }
          }}
        />
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
                      onClick={() => setEditingCategory(category)}
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
      {editingCategory && (
        <div className="mt-6">
          <EditCategory categoryId={editingCategory.id} onSuccess={handleEditSuccess} />
        </div>
      )}
    </div>
  )
}

export default Categories