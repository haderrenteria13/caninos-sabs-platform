import React from 'react'
import { NavLink } from 'react-router-dom'

const CtaSection = () => {
    const handleScroll = (id) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="py-16 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-6">¿Listo para darle lo mejor a tu mascota?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Descubre todos nuestros productos y servicios diseñados para el bienestar de tu mejor amigo.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => handleScroll('products')} className='bg-white text-orange-500 hover:bg-gray-100 p-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105'>Explorar Productos</button>
                    <button onClick={() => handleScroll('services')} className='bg-white text-orange-500 hover:bg-gray-100 p-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105'>Explorar Servicios</button>
                </div>
            </div>
        </section>
    )
}

export default CtaSection