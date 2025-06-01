import React from 'react'
import Hero from '../components/Hero'
import BestProducts from '../components/BestProducts'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
        <Hero/>
        <BestProducts/>
        <OurPolicy/>
        <Newsletter/>
    </div>
  )
}

export default Home