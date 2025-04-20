import React from 'react'
import { Dog } from 'lucide-react'

const NavBar = () => {
    const handleScroll = (id) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-5 ">
                <div className="flex justify-between items-center">
                    <button onClick={() => handleScroll('home')}>
                        <div className="flex items-center space-x-2">
                            <Dog className="h-8 w-8 text-orange-500" />
                            <span className="text-xl font-bold">Caninos SABS</span>
                        </div>
                    </button>

                    <div className="flex space-x-8">
                        <button onClick={() => handleScroll('about-us')} className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300">Quiénes somos</button>
                        <button onClick={() => handleScroll('products')} className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300">Nuestros productos</button>
                        <button onClick={() => handleScroll('services')} className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300">Nuestros servicios</button>
                        <button onClick={() => handleScroll('categories')} className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300">Nuestras categorias</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar