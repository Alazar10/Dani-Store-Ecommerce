import React, { useEffect } from 'react'
import { backendUrl } from '../App'
import { useLocation } from 'react-router-dom'


const SidebarMessages = ({ token, setUnreadCount }) => {
    const location = useLocation()

useEffect(() => {
  const fetchCount = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/contact/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setUnreadCount(data.count)
      }
    } catch (err) {
      console.error("Failed to fetch unread count")
    }
  }

  const resetUnreadCount = async () => {
    try {
      await fetch(`${backendUrl}/api/contact/reset-unread`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      })
      setUnreadCount(0)
    } catch (err) {
      console.error("Failed to reset unread count")
    }
  }

  fetchCount()

  if (location.pathname === '/messages') {
    resetUnreadCount()
  }

  const interval = setInterval(fetchCount, 10000)
  return () => clearInterval(interval)
}, [token, setUnreadCount, location.pathname])
}

export default SidebarMessages
