import { ShoppingCart } from 'lucide-react'
import React from 'react'

const OurProducts = ({ id, products }) => {
  return (
    <section id={id} className='py-20 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>Nuestros Productos</h2>
          <div className='w-24 h-1 bg-orange-500 mx-auto mb-6'></div>
          <p className='text-gray-700 max-w-2xl mx-auto leading-relaxed'>
            Descubre nuestra amplia gama de productos diseñados para el cuidado, alimentación y entretenimiento de
            tu mascota.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map((product) => (
            <div key={product.id} className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <div className='aspect-square relative overflow-hidden bg-gray-100'>
                <img src={product.imageUrl} alt={product.name} className='object-cover w-full h-full transition-transform duration-300 hover:scale-110' />
              </div>
              <div className='p-5'>
                <h3 className='font-semibold text-lg mb-3 truncate text-gray-800'>{product.name}</h3>
                <p className='text-gray-600 text-sm line-clamp-2 mb-4'>{product.description}</p>
                <div className='flex items-center justify-between mb-4'>
                  <p className='text-lg font-bold text-orange-500'>${product.price.toFixed(2)}</p>
                  <p className={`text-sm font-medium ${product.stock < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                    {product.stock < 5 ? '¡Pocas unidades!' : `Stock: ${product.stock}`}
                  </p>
                </div>
                <button className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105'>
                  <ShoppingCart className='h-5 w-5 mr-2' /> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurProducts