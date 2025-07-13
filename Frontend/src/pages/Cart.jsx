import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const productId in cartItems) {
      for (const sizeLabel in cartItems[productId]) {
        if (cartItems[productId][sizeLabel] > 0) {
          tempData.push({
            _id: productId,
            size: sizeLabel,
            quantity: cartItems[productId][sizeLabel]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="border-t pt-14 text-[#333333]">
      <div className="text-2xl mb-3 text-[#FF8C00]">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id)
          if (!productData) return null

          const sizeData = productData.sizes?.find((s) => s.label === item.size)

          return (
            <div
              key={index}
              className="py-4 border-t border-b border-[#333333] grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20 border border-[#333333] rounded" src={productData.image?.[0]} alt="product" />
                <div>
                  <p className="text-xs sm:text-lg font-medium text-[#333333]">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-sm sm:text-base font-medium text-[#333333]">
                      {sizeData?.price || productData.price} {currency}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 text-xs sm:text-sm border border-[#333333] rounded bg-[#FFF3E5] text-[#FF8C00]">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val > 0) updateQuantity(item._id, item.size, val)
                }}
                className="border border-[#333333] text-[#333333] max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded"
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin}
                alt="remove"
              />
            </div>
          )
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-[#FF8C00] hover:bg-orange-500 text-white text-sm my-8 px-8 py-3 rounded transition cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
