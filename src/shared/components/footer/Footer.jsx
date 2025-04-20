import { Dog, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const handleScroll = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center mb-4'>
              <Dog className='h-8 w-8 text-orange-500' />
              <span className='ml-2 text-xl font-bold'>Caninos SABS</span>
            </div>
            <p className='text-gray-400 mb-4'>Expertos en productos y servicios para el cuidado y bienestar de tu mejor amigo.</p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Enlaces Rápidos</h3>
            <ul>
              <li>
                <button onClick={() => handleScroll('home')} className='text-gray-400 hover:text-orange-500 transition-colors'>Inicio</button>
              </li>
              <li>
                <button onClick={() => handleScroll('products')} className='text-gray-400 hover:text-orange-500 transition-colors'>Productos</button>
              </li>
              <li>
                <button onClick={() => handleScroll('services')} className='text-gray-400 hover:text-orange-500 transition-colors'>Servicios</button>
              </li>
              <li>
                <button onClick={() => handleScroll('categories')} className='text-gray-400 hover:text-orange-500 transition-colors'>Categorias</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <MapPin className='h-5 w-5 text-orange-500 mr-2 mt-0.5' />
                <span className='text-gray-400'>Calle 57 #27-81, Medellín, Colombia</span>
              </li>
              <li className='flex items-start'>
                <Phone className='h-5 w-5 text-orange-500 mr-2 mt-0.5' />
                <span className='text-gray-400'>+1 234 567 890</span>
              </li>
              <li className='flex items-start'>
                <Mail className='h-5 w-5 text-orange-500 mr-2 mt-0.5' />
                <span className='text-gray-400'>info@caninossabs.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Redes Sociales</h3>
            <div className='flex space-x-3'>
              <a href="https://www.instagram.com/" target='_blank' aria-label="Instagram" className='text-white hover:text-orange-500 bg-orange-500 hover:bg-white p-2 rounded-full transition-colors'>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/" target='_blank' aria-label="Facebook" className='text-white hover:text-orange-500 bg-orange-500 hover:bg-white p-2 rounded-full transition-colors'>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/" target='_blank' aria-label="Twitter" className='text-white hover:text-orange-500 bg-orange-500 hover:bg-white p-2 rounded-full transition-colors'>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm'>
          <p>&copy; {new Date().getFullYear()} Caninos SABS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer