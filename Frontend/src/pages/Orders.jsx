import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('status') === 'success') {
      toast.success('✅ Payment confirmed. Your order is being processed!')
    }
  }, [])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            })
          })
        })

        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error("Failed to load orders:", error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-16 px-4 sm:px-10">
      <div className="text-2xl text-[#FF8C00] font-semibold mb-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-center mt-10 text-[#999999]">
            You haven’t placed any orders yet.
          </p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b border-[#333333] text-[#333333] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover border border-[#FF8C00] rounded"
                  src={item.image?.[0] || '/fallback-image.jpg'}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-[#333333]">
                    <p>{item.price}{currency}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-sm text-[#555555]">
                    Date: {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-sm text-[#555555]">
                    Payment Method: {item.paymentMethod}
                  </p>
                  <p className="text-sm text-[#555555]">
                    Order ID: {item.orderId}
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'delivered'
                        ? 'bg-green-500'
                        : 'bg-yellow-400'
                    }`}
                  />
                  <p className="text-sm md:text-base capitalize">
                    {item.status}
                  </p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-[#333333] text-[#333333] px-4 py-2 text-sm font-medium rounded-sm hover:bg-[#FFF3E5] transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
