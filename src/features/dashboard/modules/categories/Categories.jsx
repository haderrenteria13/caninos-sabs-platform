import React, { useState, useEffect } from 'react'
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
        alert('Categoría eliminada correctamente')
        setCategories((prev) => prev.filter((category) => category.id !== id))
        setDeletingId(null)
      } else {
        alert('Error al eliminar la categoría')
        setDeletingId(null)
      }
    }
  }

  const handleEditSuccess = () => {
    alert('Categoría actualizada con éxito')
    setEditingCategory(null)
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Categorías</h1>
      <FormCategories
        onSubmit={async (formData) => {
          try {
            const newCategory = await categoriesApi.create(formData)
            alert('Categoría creada con éxito')
            setCategories([...categories, newCategory])
          } catch (error) {
            alert(error.message)
          }
        }} />
      {deleteError && <p style={{ color: 'red' }}>Error al eliminar la categoría: {deleteError}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <button onClick={() => handleDelete(category.id)} disabled={deletingId === category.id}>
              {deletingId === category.id ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button onClick={() => setEditingCategory(category)}>Editar</button>
          </li>
        ))}
      </ul>
      {editingCategory && (<EditCategory categoryId={editingCategory.id} onSuccess={handleEditSuccess} />)}
    </div>
  )
}

export default Categories