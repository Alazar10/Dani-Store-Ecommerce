import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-[#333333] bg-white">
      {/* Left Side of Hero */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#333333]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#FF8C00]"></p>
            <p className="font-medium text-sm md:text-base text-[#333333]">OUR BEST PRODUCTS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-[#333333]">
            Original Products
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base text-[#FF8C00]">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#FF8C00]"></p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <img className="w-full sm:w-1/2 object-cover" src={assets.Hero_img} alt="Hero Banner" />
    </div>
  )
}

export default Hero
