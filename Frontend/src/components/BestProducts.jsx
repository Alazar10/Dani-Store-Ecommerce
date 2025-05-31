import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestProducts = () => {

    const { products } = useContext(ShopContext)
    const [bestProducts, setBestProducts] = useState([])

    useEffect(()=>{
        setBestProducts(products.slice(0,10));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Strength meets innovation—premium fitness products designed to elevate your performance, enhance endurance, and empower every step of your journey to greatness!
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestProducts