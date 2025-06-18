import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { currency } from '../../../Admin/Admin/src/App'

const Product = () => {
  const { productId } = useParams()
  const { products } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (products.length === 0) return // Wait for products to be loaded

    const selected = products.find((item) => item._id === productId)

    if (selected) {
      setProductData(selected)
      setImage(Array.isArray(selected.image) ? selected.image[0] : selected.image)
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0">Loading product...</div>
  

  return (
   <div className="border-t pt-10 px-4 sm:px-10 transition-opacity ease-in duration-500 opacity-100">
  <div className="flex flex-col sm:flex-row gap-10">
    
    {/* Image Gallery */}
    <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
      <div className="flex sm:flex-col sm:w-[18%] overflow-x-auto sm:overflow-y-auto gap-2 sm:gap-4">
        {productData.image.map((item, index) => (
          <img
            key={index}
            src={item}
            onClick={() => setImage(item)}
            className="w-1/4 sm:w-full sm:h-20 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
          />
        ))}
      </div>
      <div className="w-full sm:w-[82%]">
        <img
          src={image}
          className="w-full max-h-[600px] object-contain bg-white rounded-md shadow-md"
        />
      </div>
    </div>

    {/* Product Info */}
    <div className="flex-1 space-y-4">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">{productData.name}</h1>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <img key={i} src={assets.star} className="w-4" />
        ))}
      </div>

      <p className="text-2xl font-bold text-blue-700">{productData.price} {currency}</p>

      {productData.description && (
        <p className="text-gray-600 leading-relaxed">{productData.description}</p>
      )}

      {productData.sizes && (
        <p className="text-gray-500"><span className="font-medium">Size:</span> {productData.sizes}</p>
      )}

      <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-6 text-sm rounded shadow-md transition-all">
        ADD TO CART
      </button>
    </div>
  </div>
</div>
  )
}

export default Product
