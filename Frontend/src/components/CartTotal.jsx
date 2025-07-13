import React from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useContext } from 'react'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full text-[#333333]">
      <div className="text-2xl text-[#FF8C00] font-semibold mb-2">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="text-[#555555]">Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <hr className="border-t border-[#333333]" />

        <div className="flex justify-between">
          <p className="text-[#555555]">Delivery Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr className="border-t border-[#333333]" />

        <div className="flex justify-between">
          <b className="text-[#FF8C00]">Total</b>
          <b className="text-[#FF8C00]">{currency} {total}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
