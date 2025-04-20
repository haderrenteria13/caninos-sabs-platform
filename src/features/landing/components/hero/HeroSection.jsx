import React from 'react'

const HeroSection = ({ id }) => {
    const handleScroll = (id) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id={id} className='bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 py-20'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row items-center'>
                    <div className='md:w-1/2 mb-10 md:mb-0'>
                        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-6'>Bienvenidos a Caninos SABS</h1>
                        <p className='text-lg text-gray-700 mb-8 leading-relaxed'>
                            Expertos en productos y servicios para el cuidado y bienestar de tu mejor amigo.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button onClick={() => handleScroll('products')} className='bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md h-12 px-6 py-2 text-white font-semibold transition-transform transform hover:scale-105'>
                                Ver Productos
                            </button>
                            <button onClick={() => handleScroll('services')} className='border-orange-500 text-orange-500 hover:bg-orange-100 border rounded-lg shadow-md h-12 px-6 py-2 font-semibold transition-transform transform hover:scale-105'>
                                Nuestros Servicios
                            </button>
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        <img src="https://media.istockphoto.com/id/1995409360/es/foto/equipo-veterinario-masculino-y-femenino-administrando-inyecci%C3%B3n-a-perro-akita-mascota-en.jpg?s=612x612&w=0&k=20&c=AZuEF09ajeoRJzCffwXfmWAz-551bMaTOecRAucCCDs=" alt="Perro bien cuidado" className='rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection