// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const STATUS_OPTIONS = [
  'Order Placed',
  'Packing',
  'Out for Delivery',
  'Delivered'
]

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all orders (admin)
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error('No admin token—cannot fetch orders')
      return
    }
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) setOrders(data.orders)
      else toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Update order status
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId: selectedOrder._id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }))
        setOrders(prev =>
          prev.map(o =>
            o._id === selectedOrder._id ? { ...o, status: newStatus } : o
          )
        )
        toast.success('Status updated')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const closeModal = () => setSelectedOrder(null)

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  // Helper to get a single image or fallback
  const getImageSrc = (imageField) => {
    if (!imageField) return assets.noImage
    return Array.isArray(imageField)
      ? imageField[0] || assets.noImage
      : imageField
  }

  // Filter orders by search term
  const filteredOrders = orders.filter(o =>
    o._id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID..."
          className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading orders…</p>
      ) : filteredOrders.length > 0 ? (
        <div className="grid gap-4">
          {filteredOrders.map(order => {
            const firstItem = order.items?.[0] || {}
            const imgSrc = getImageSrc(firstItem.image)

            return (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #{order._id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold">{order.amount} ETB</p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={imgSrc}
                    alt={firstItem.name || 'Product'}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {firstItem.name || 'Unknown Product'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {firstItem.size || '-'} • {firstItem.quantity || '-'} ×{' '}
                      {firstItem.price || '-'} ETB
                    </p>
                    {order.items?.length > 1 && (
                      <p className="text-xs text-gray-500">
                        +{order.items.length - 1} more item
                        {order.items.length - 1 > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-xs">
                  Status:{' '}
                  <span className="font-medium">{order.status}</span>
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-600">No orders to display.</p>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-3xl rounded-lg shadow-lg relative p-6 overflow-y-auto max-h-[90vh]">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

            {/* Items */}
            <section className="mb-4">
              <h3 className="font-medium mb-2">Items</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {selectedOrder.items?.map((it, i) => {
                  const img = getImageSrc(it.image)
                  return (
                    <li key={i} className="mb-3 flex items-center gap-4">
                      <img
                        src={img}
                        alt={it.name || 'Product'}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p>
                          <span className="font-medium">{it.name || '-'}</span> —{' '}
                          {it.size || '-'}
                        </p>
                        <p>
                          {it.price || '-'} ETB × {it.quantity || '-'}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Customer Info */}
            <section className="mb-4">
              <h3 className="font-medium mb-2">Customer</h3>
              <p>
                <span className="font-medium">Name:</span>{' '}
                {selectedOrder.address?.firstName || '-'}{' '}
                {selectedOrder.address?.lastName || ''}
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                {selectedOrder.address?.email || '-'}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                +251{selectedOrder.address?.phone || '-'}
              </p>
              <p>
                <span className="font-medium">Address:</span>{' '}
                {selectedOrder.address
                  ? `${selectedOrder.address.street}, ${selectedOrder.address.village}, ${selectedOrder.address.subcity}, ${selectedOrder.address.city}, ${selectedOrder.address.country}`
                  : '-'}
              </p>
            </section>

            {/* Payment & Status */}
            <section className="mb-6">
              <p>
                <span className="font-medium">Payment Method:</span>{' '}
                {selectedOrder.paymentMethod || '-'}
              </p>
              <p>
                <span className="font-medium">Total Paid:</span>{' '}
                {selectedOrder.amount || '-'} ETB
              </p>
              <p>
                <span className="font-medium">Current Status:</span>{' '}
                {selectedOrder.status || '-'}
              </p>
            </section>

            {/* Admin Status Dropdown */}
            <section>
              <label className="block font-medium mb-2">Update Status:</label>
              <select
                value={selectedOrder.status}
                onChange={handleStatusChange}
                className="border px-3 py-2 rounded w-full"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders

