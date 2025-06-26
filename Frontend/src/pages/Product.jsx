import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState(null)

  useEffect(() => {
    if (products.length === 0) return
    const selected = products.find((item) => item._id === productId)
    if (selected) {
      setProductData(selected)
      setImage(Array.isArray(selected.image) ? selected.image[0] : selected.image)
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0">Loading product...</div>

  return (
    <div className="border-t pt-10 px-4 sm:px-10 transition-opacity duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4 h-[600px]">
          {/* Thumbnails */}
          <div className="sm:h-full sm:w-[18%] flex sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[80px] h-[80px] object-cover rounded-md border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[82%] overflow-hidden rounded-md shadow-md group">
            <img
              src={image}
              alt="Product"
              className="w-full h-full object-contain bg-white transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 h-[600px] overflow-y-auto pr-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={assets.star} className="w-4" />
            ))}
          </div>

          <p className="text-2xl font-bold text-black mt-3">
            {size?.price || productData.price} {currency}
          </p>

          {productData.description && (
            <p className="text-gray-600 leading-relaxed mt-4">{productData.description}</p>
          )}

          {Array.isArray(productData.sizes) && productData.sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-500 font-medium mb-1">Select Size:</p>
              {productData.sizes.some(s => s.stock > 0) ? (
                <div className="flex gap-2 flex-wrap">
                  {productData.sizes
                    .filter(s => s.stock > 0)
                    .map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1 border rounded text-sm ${size?.label === s.label
                            ? 'bg-black text-white'
                            : 'border-gray-400 text-gray-600 hover:border-black'
                          }`}
                      >
                        {s.label}
                      </button>
                    ))}
                </div>
              ) : (
                <p className="text-red-500 text-sm font-medium mt-1">Currently Out of Stock. Coming Soon.</p>
              )}
            </div>
          )}



          {size?.stock !== undefined && (
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Stock:</span> {size.stock}
            </p>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size || size.stock === 0}
            className={`font-light px-8 py-2 mt-6 rounded transition duration-150 ease-in-out ${size && size.stock > 0
              ? 'bg-black text-white hover:bg-gray-800 active:scale-95 active:bg-gray-900'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-t border-gray-300" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
