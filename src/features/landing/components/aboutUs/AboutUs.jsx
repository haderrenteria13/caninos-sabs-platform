import { Check } from 'lucide-react'
import React from 'react'

const AboutUs = ({ id }) => {
  return (
    <section id={id} className='py-20 bg-gradient-to-b from-orange-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>Quiénes Somos</h2>
          <div className='w-24 h-1 bg-orange-500 mx-auto'></div>
        </div>

        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 mb-10 md:mb-0 md:pr-10'>
            <img src="https://mundovets.com/wp-content/uploads/2024/01/importancia-fomentar-colaboracion-especialistas-equipo-veterinario.jpg" alt="Nuestro equipo" className='rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl' />
          </div>
          <div className='md:w-1/2'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Nuestra Historia:</h3>
            <p className='text-gray-700 mb-6 leading-relaxed'>
              Caninos SABS nació en 2010 con la misión de proporcionar productos y servicios de alta calidad para el
              cuidado de mascotas. Desde entonces, nos hemos convertido en líderes del sector, ofreciendo soluciones
              innovadoras y personalizadas para cada uno de nuestros clientes caninos.
            </p>
            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Nuestros Valores:</h3>
            <ul className='space-y-4'>
              <li className='flex items-center'>
                <span className='mr-3'><Check className='h-6 w-6 text-orange-500' /></span>
                <span className='text-gray-700 font-medium'>Pasión por los animales</span>
              </li>
              <li className='flex items-center'>
                <span className='mr-3'><Check className='h-6 w-6 text-orange-500' /></span>
                <span className='text-gray-700 font-medium'>Compromiso con la calidad</span>
              </li>
              <li className='flex items-center'>
                <span className='mr-3'><Check className='h-6 w-6 text-orange-500' /></span>
                <span className='text-gray-700 font-medium'>Innovación constante</span>
              </li>
              <li className='flex items-center'>
                <span className='mr-3'><Check className='h-6 w-6 text-orange-500' /></span>
                <span className='text-gray-700 font-medium'>Responsabilidad y ética profesional</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs