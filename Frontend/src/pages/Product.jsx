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
    const selected = products.find(item => item._id?.toString() === productId)
    if (selected) {
      setProductData(selected)
      const firstImage = Array.isArray(selected.image) && selected.image.length > 0
        ? selected.image[0]
        : assets.placeholder || ''
      setImage(firstImage)
    }
  }, [productId, products])

  const handleAddToCart = () => {
    if (!size) return
    console.log("🛒 Adding to cart:", {
      productId: productData._id,
      sizeLabel: size.label,
      quantity: 1
    })
    addToCart(productData._id, size)
  }

  if (!productData) return <div className="opacity-0">Loading product...</div>

  return (
    <div className="border-t pt-10 px-4 sm:px-10 transition-opacity duration-500 opacity-100 text-[#333333]">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4 h-[600px]">
          <div className="sm:h-full sm:w-[18%] flex sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className="w-[80px] h-[80px] object-cover rounded-md border border-[#333333] cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          <div className="w-full sm:w-[82%] overflow-hidden rounded-md shadow-md group border border-[#333333] bg-white">
            <img
              src={image}
              alt="Product"
              className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 h-[600px] overflow-y-auto pr-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#FF8C00]">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={assets.star} className="w-4" />
            ))}
          </div>

          <p className="text-2xl font-bold mt-3 text-[#333333]">
            {size?.price || productData.price} {currency}
          </p>

          {productData.description && (
            <p className="text-[#555555] leading-relaxed mt-4">{productData.description}</p>
          )}

          {Array.isArray(productData.sizes) && productData.sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-[#777777] font-medium mb-1">Select Size:</p>
              {productData.sizes.some(s => s.stock > 0) ? (
                <div className="flex gap-2 flex-wrap">
                  {productData.sizes
                    .filter(s => s.stock > 0)
                    .map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1 border rounded text-sm transition ${
                          size?.label === s.label
                            ? 'bg-[#FF8C00] text-white border-[#FF8C00]'
                            : 'border-[#333333] text-[#333333] hover:bg-[#FF8C00] hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                </div>
              ) : (
                <p className="text-red-500 text-sm font-medium mt-1">
                  Currently Out of Stock. Coming Soon.
                </p>
              )}
            </div>
          )}

          {size?.stock !== undefined && (
            <p className="text-sm text-[#555555] mt-2">
              <span className="font-medium">Stock:</span> {size.stock}
            </p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!size || size.stock === 0}
            className={`font-medium px-8 py-2 mt-6 rounded transition duration-150 ease-in-out ${
              size && size.stock > 0
                ? 'bg-[#FF8C00] text-white hover:bg-orange-500 active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-t border-[#333333]" />

          <div className="text-sm text-[#555555] mt-5 flex flex-col gap-1">
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
