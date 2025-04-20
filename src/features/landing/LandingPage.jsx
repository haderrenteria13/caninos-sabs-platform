import React from 'react'
import AboutUs from './components/aboutUs/AboutUs'
import OurProducts from './components/ourProducts/OurProducts'
import OurServices from './components/ourServices/OurServices'
import OurCategories from './components/ourCategories/OurCategories'
import useProducts from './components/ourProducts/hooks/useProducts'
import NavBar from '../../shared/components/navBar/NavBar'
import CtaSection from './components/cta/CtaSection'
import Footer from '../../shared/components/footer/Footer'
import useCategories from './components/ourCategories/hooks/useCategories'
import HeroSection from './components/hero/HeroSection'
import { toast } from 'react-toastify'

const LandingPage = () => {
  const { products, loading: loadingProducts, error: errorProducts } = useProducts()
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories()
  return (
    <main>
      <NavBar />
      <HeroSection id="home" />
      <AboutUs id="about-us" />
      {loadingProducts && <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>}
      {errorProducts && toast.error(`Error al cargar los productos: ${errorProducts}`)}
      {!loadingProducts && !errorProducts && <OurProducts id="products" products={products} />}
      <OurServices id="services" />
      {loadingCategories && <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>}
      {errorCategories && toast.error(`Error al cargar las categorias: ${errorCategories}`)}
      {!loadingCategories && !errorCategories && <OurCategories id="categories" categories={categories} />}
      <CtaSection />
      <Footer />
    </main>
  )
}

export default LandingPage