import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

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
              orderId: order._id,             // ← include orderId
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
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            You haven’t placed any orders yet.
          </p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover border border-gray-100 rounded"
                  src={item.image?.[0] || '/fallback-image.jpg'}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{item.price}{currency}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Date: {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment Method: {item.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-500">
                    Order ID: {item.orderId}        {/* ← display orderId */}
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
                  className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50"
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
