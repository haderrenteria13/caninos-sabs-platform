import React from 'react'
import AboutUs from './components/aboutUs/AboutUs'
import OurProducts from './components/ourProducts/OurProducts'
import OurServices from './components/ourServices/OurServices'
import OurCategories from './components/ourCategories/OurCategories'
import useProducts from './components/ourProducts/hooks/useProducts'

const LandingPage = () => {
  const { products, loading, error } = useProducts()
  return (
    <main>
      <p>Landing</p>
      <AboutUs />
      {loading && <p>Cargando los productos...</p>}
      {error && <p>Error al cargar los productos: {error}.</p>}
      {!loading && !error && <OurProducts products={products} />}
      <OurServices />
      <OurCategories />
    </main>
  )
}

export default LandingPage