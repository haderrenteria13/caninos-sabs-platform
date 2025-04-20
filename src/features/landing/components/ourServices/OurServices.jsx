import React from 'react'

const OurServices = ({ id }) => {
  const services = [
    { id: 1, title: 'Cuidado Veterinario', description: 'Atención médica profesional para garantizar la salud de tu mascota.', imageUrl: 'https://www.animalhome.com.mx/wp-content/uploads/2020/07/EQUIPO-VETERINARIO-INSTALACIONES-HOSPITAL-ANIMAL-HOME.jpg' },
    { id: 2, title: 'Estética Canina', description: 'Servicios de peluquería y spa para mantener a tu mascota limpia y feliz.', imageUrl: 'https://www.aprendemas.com/es/blog/images/2022/07/peluqueria_canina.jpg' },
    { id: 3, title: 'Adiestramiento', description: 'Clases personalizadas para mejorar el comportamiento de tu perro.', imageUrl: 'https://purina.com.co/sites/default/files/2023-11/adiestramiento-canino-dar-la-patita-co.jpg' },
    { id: 4, title: 'Guardería', description: 'Un lugar seguro y divertido para tu mascota mientras estás fuera.', imageUrl: 'https://imagenes.elpais.com/resizer/v2/KKJVQRC2FZBG7ERTPQ6YMPA4XU.jpg?auth=39fd96cb77f94cb993961150fb6df7942bb5399a7833120df32e068bb5000bc6&width=414' },
  ]

  return (
    <section id={id} className='py-20 bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>Nuestros Servicios</h2>
          <div className='w-24 h-1 bg-orange-500 mx-auto'></div>
          <p className='text-gray-700 max-w-2xl mx-auto mt-4 leading-relaxed'>
            Ofrecemos una variedad de servicios diseñados para el bienestar y felicidad de tu mascota.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {services.map((service) => (
            <div key={service.id} className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <div className='aspect-square relative overflow-hidden bg-gray-100'>
                <img src={service.imageUrl} alt={service.title} className='object-cover w-full h-full transition-transform duration-300 hover:scale-110' />
              </div>
              <div className='p-5'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>{service.title}</h3>
                <p className='text-gray-600 text-sm leading-relaxed'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServices