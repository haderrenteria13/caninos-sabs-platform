import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'
import useGetProducts from './hooks/useGetProducts'
import useDeleteProducts from './hooks/useDeleteProducts'
import FormProducts from './components/FormProducts'
import productsApi from './services/productsApi'

const Products = () => {
  const { products: initialProducts, error, loading } = useGetProducts()
  const { deleteProduct, error: deleteError } = useDeleteProducts()
  const [products, setProducts] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar este producto?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteProduct(id)
      if (success) {
        toast.success('Producto eliminado correctamente')
        setProducts((prev) => prev.filter((product) => product.id !== id))
      } else {
        toast.error('Error al eliminar el producto')
      }
      setDeletingId(null)
    }
  }

  const handleEditSuccess = async () => {
    try {
      const updatedProducts = await productsApi.getAll()
      setProducts(updatedProducts)
      toast.success('Producto actualizado con éxito')
    } catch (error) {
      toast.error('Error al actualizar la lista de productos')
    }
    setEditingProduct(null)
    setIsEditModalOpen(false)
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
      >
        Añadir Producto
      </button>
      {deleteError && (
        <p className="text-red-500 mb-4">
          Error al eliminar el producto: {deleteError}
        </p>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Categoría</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.description}</td>
                <td className="py-3 px-6 text-left">{product.stock}</td>
                <td className="py-3 px-6 text-left">${product.price}</td>
                <td className="py-3 px-6 text-left">{product.categoryName}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => {
                        setEditingProduct(product)
                        setIsEditModalOpen(true)
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className={`text-red-500 hover:underline ${deletingId === product.id ? 'opacity-50' : ''
                        }`}
                    >
                      {deletingId === product.id
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

      {/* Modal para añadir producto */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <FormProducts
              onSubmit={async (formData) => {
                try {
                  const newProduct = await productsApi.create(formData)
                  const updatedProducts = await productsApi.getAll()
                  setProducts(updatedProducts)
                  toast.success('Producto creado con éxito')
                  setIsModalOpen(false)
                } catch (error) {
                  toast.error(error.message)
                }
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal para editar producto */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm" /> {/* Fondo transparente con desenfoque */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-lg"> {/* Panel semi-transparente */}
            {editingProduct && (
              <FormProducts
                product={editingProduct}
                onSubmit={async (formData) => {
                  try {
                    await productsApi.update(editingProduct.id, formData)
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

export default Products