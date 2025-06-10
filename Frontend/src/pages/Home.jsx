import React from 'react'
import Hero from '../components/Hero'
import BestProducts from '../components/BestProducts'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'
import Location from '../components/Location'

const Home = () => {
  return (
    <div>
        <Hero/>
        <BestProducts/>
        <OurPolicy/>
        <Location/>
        <Newsletter/>
    </div>
  )
}

export default Home