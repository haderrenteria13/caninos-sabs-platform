import React from 'react'

const OurProducts = ({ products }) => {
  return (
    <section>
      <h2>Productos</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Categoría:</strong> {product.categoryName}</p>
            <p><strong>Descripción de la Categoría:</strong> {product.categoryDescription}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurProducts