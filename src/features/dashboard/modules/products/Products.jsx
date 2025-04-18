import React, { useState, useEffect } from 'react'
import useGetProducts from './hooks/useGetProducts'
import useDeleteProducts from './hooks/useDeleteProducts'
import FormProducts from './components/FormProducts'
import EditProducts from './components/EditProducts'
import productsApi from './services/productsApi'

const Products = () => {
  const { products: initialProducts, error, loading } = useGetProducts()
  const { deleteProduct, error: deleteError } = useDeleteProducts()
  const [products, setProducts] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar este producto?')
    if (confirmed) {
      setDeletingId(id)
      const success = await deleteProduct(id)
      if (success) {
        alert('Producto eliminado correctamente')
        setProducts((prev) => prev.filter((product) => product.id !== id))
        setDeletingId(null)
      } else {
        alert('Error al eliminar el producto')
        setDeletingId(null)
      }
    }
  }

  const handleEditSuccess = () => {
    alert('Producto actualizado con éxito')
    setEditingProduct(null)
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Productos</h1>
      <FormProducts
        onSubmit={async (formData) => {
          try {
            const newProduct = await productsApi.create(formData)
            alert('Producto creado con éxito')
            setProducts([...products, newProduct])
          } catch (error) {
            alert(error.message)
          }
        }} />
      {deleteError && <p style={{ color: 'red' }}>Error al eliminar el producto: {deleteError}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Descripción: {product.description}</p>
            <p>Cantidad: {product.count}</p>
            <p>Stock: {product.stock}</p>
            <p>Precio: ${product.price}</p>
            <p>Categoría ID: {product.categoryId}</p>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
            <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id}>
              {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button onClick={() => setEditingProduct(product)}>Editar</button>
          </li>
        ))}
      </ul>
      {editingProduct && (<EditProducts productId={editingProduct.id} onSuccess={handleEditSuccess} />)}
    </div>
  )
}

export default Products