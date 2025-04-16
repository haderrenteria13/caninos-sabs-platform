import React from 'react'
import AboutUs from './components/aboutUs/AboutUs'
import OurProducts from './components/ourProducts/OurProducts'
import OurServices from './components/ourServices/OurServices'
import OurCategories from './components/ourCategories/OurCategories'

const LandingPage = () => {
  return (
    <main>
      <p>Landing</p>
      <AboutUs/>
      <OurProducts/>
      <OurServices/>
      <OurCategories/>
    </main>
  )
}

export default LandingPage