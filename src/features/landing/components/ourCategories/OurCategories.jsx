import React from 'react'

const OurCategories = ({ id, categories }) => {
  return (
    <section id={id} className='py-20 bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>Nuestras Categorías</h2>
          <div className='w-24 h-1 bg-orange-500 mx-auto mb-6'></div>
          <p className='text-gray-700 max-w-2xl mx-auto leading-relaxed'>
            Explora nuestras categorías de productos para encontrar exactamente lo que tu mascota
            necesita.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {categories.map((category) => (
            <div key={category.id} className='bg-white border border-orange-500 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105'>
              <div className='mb-4'>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>{category.name}</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurCategories