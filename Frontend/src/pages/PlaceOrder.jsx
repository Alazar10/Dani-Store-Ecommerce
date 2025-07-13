import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    subcity: '',
    street: '',
    village: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            const matchedSize = itemInfo.sizes.find(s => s.label === item)

            if (matchedSize) {
              const requestedQty = cartItems[items][item]
              const availableQty = matchedSize.stock

              if (requestedQty > availableQty) {
                toast.error(`Only ${availableQty} left for ${itemInfo.name} (${item})`)
                return
              }

              itemInfo.size = matchedSize.label
              itemInfo.quantity = requestedQty
              itemInfo.price = matchedSize.price
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          if (res.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(res.data.message)
          }
          break

        case 'chapa':
          const tx_ref = Date.now().toString()
          try {
            const chapaRes = await axios.post(`${backendUrl}/api/payment/chapa`, {
              amount: orderData.amount,
              email: formData.email,
              first_name: formData.firstName,
              last_name: formData.lastName,
              tx_ref
            })

            if (chapaRes.data.success && chapaRes.data.checkout_url) {
              toast.info("Redirecting to Chapa...")
              window.location.href = chapaRes.data.checkout_url
            } else {
              toast.error("Failed to initialize Chapa payment.")
            }
          } catch (err) {
            console.error("❌ Chapa error:", err.message)
            toast.error("Chapa payment failed.")
          }
          break

        default:
          break
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 text-[#FF8C00]">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} required placeholder="First Name"
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} required placeholder="Last Name"
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
        </div>

        <input name="email" value={formData.email} onChange={onChangeHandler} required type="email" placeholder="Email Address"
          className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />

        <input name="country" value={formData.country} onChange={onChangeHandler} required placeholder="Country"
          className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />

        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={onChangeHandler} required placeholder="City"
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
          <input name="subcity" value={formData.subcity} onChange={onChangeHandler} required placeholder="Sub City"
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
        </div>

        <div className="flex gap-3">
          <input name="street" value={formData.street} onChange={onChangeHandler} required placeholder='Street e.g "Piazza, Atote"'
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
          <input name="village" value={formData.village} onChange={onChangeHandler} required placeholder='Village e.g "Genet, Korem"'
            className="border border-[#333333] text-[#333333] rounded py-1.5 px-3.5 w-full placeholder-[#555555]" />
        </div>

        <div className="flex items-center border border-gray-300 rounded w-full overflow-hidden">
          <span className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm border-r border-gray-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg"
              alt="ET"
              className="w-5 h-4 object-cover rounded-sm"
            />
            +251
          </span>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="text"
            placeholder="9XXXXXXXX"
            pattern="9\d{8}"
            maxLength={9}
            inputMode="numeric"
            className="w-full px-3 py-1.5 outline-none text-sm"
          />

        </div>
      </div>

      {/* Right Section */}
      <div className="mt-8">
        <div className="min-w-80 mb-6">
          <CartTotal />
        </div>

        <Title text1="PAYMENT" text2="METHOD" />

        <div className="flex gap-3 flex-col lg:flex-row mt-4">
          <div onClick={() => setMethod('chapa')}
            className="flex items-center gap-3 border border-[#333333] p-2 px-3 cursor-pointer rounded">
            <p className={`min-w-3.5 h-3.5 border border-[#333333] rounded-full ${method === 'chapa' ? 'bg-[#FF8C00]' : ''}`}></p>
            <img className="h-5 mx-4" src={assets.chapa} alt="Chapa" />
          </div>

          <div onClick={() => setMethod('cod')}
            className="flex items-center gap-3 border border-[#333333] p-2 px-3 cursor-pointer rounded">
            <p className={`min-w-3.5 h-3.5 border border-[#333333] rounded-full ${method === 'cod' ? 'bg-[#FF8C00]' : ''}`}></p>
            <p className="text-[#333333] text-sm font-medium mx-4">CASH ON DELIVERY</p>
          </div>


          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#FF8C00] hover:bg-orange-500 text-white px-16 py-3 text-sm cursor-pointer rounded transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
