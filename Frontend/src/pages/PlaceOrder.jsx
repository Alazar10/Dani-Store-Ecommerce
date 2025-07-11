import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
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
                toast.error(`Only ${availableQty} left for ${itemInfo.name} (${item}) in the stock`)
                return // stop placing the order
              }

              itemInfo.size = matchedSize.label
              itemInfo.quantity = cartItems[items][item]
              itemInfo.price = matchedSize.price
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: {Authorization: `Bearer ${token}`} })

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')

          } else {
            toast.error(response.data.message)
          }
          break;

        default:
          break
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' />
          <input required onChange={onChangeHandler} name='subcity' value={formData.subcity} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Sub City' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street e.g "Piazza, Atote"' />
          <input required onChange={onChangeHandler} name='village' value={formData.village} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Village e.g "Genet, Korem"' />
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

      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg-flex-row'>
            <div onClick={() => setMethod('chapa')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'chapa' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.chapa} />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>

            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder