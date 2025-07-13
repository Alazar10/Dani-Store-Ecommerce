import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const Notifications = () => {
  const { token, backendUrl, userId, refreshNotificationCount } = useContext(ShopContext)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user-notify`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success && Array.isArray(res.data.notifications)) {
          setNotifications(res.data.notifications)
          console.log("🧾 Loaded notifications:", res.data.notifications)
        } else {
          console.warn("⚠️ Unexpected response:", res.data)
        }
      } catch (err) {
        console.error("❌ Failed to load notifications:", err)
      }
    }

    if (token) fetchNotifications()
  }, [token, backendUrl])

  const handleMarkRead = async (id) => {
    try {
      const res = await axios.post(`${backendUrl}/api/user-notify/mark-read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setNotifications(prev =>
          prev.map(n =>
            n._id === id
              ? { ...n, readBy: [...(n.readBy || []), userId] }
              : n
          )
        )
        refreshNotificationCount()
      }
    } catch (err) {
      console.error("❌ Failed to mark as read:", err)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#FF8C00] mb-4">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-[#999999]">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => {
            const isRead = (note.readBy || []).some(id => id === userId)
            return (
              <li key={note._id} className="border-l-4 border-[#FF8C00] pl-4 bg-white rounded-md shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#333333]">{note.title}</h3>
                    <p className="text-sm text-[#555555]">{note.message}</p>
                    <p className="text-xs text-[#999999] mt-1">
                      {new Date(note.date).toLocaleString()}
                    </p>
                  </div>
                  {!isRead && (
                    <button
                      className="ml-4 mt-1 text-xs bg-[#FF8C00] hover:bg-orange-500 text-white px-3 py-1 rounded transition"
                      onClick={() => handleMarkRead(note._id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Notifications
