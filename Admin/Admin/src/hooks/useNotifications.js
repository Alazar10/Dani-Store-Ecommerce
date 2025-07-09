import { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

function useNotifications(token) {
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) setNotes(data.notifications)
    } catch (err) {
      console.error('Notification fetch failed:', err)
    }
  }

  const markRead = async (id) => {
    try {
      await axios.post(
        `${backendUrl}/api/notifications/read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes(prev => prev.filter(n => n._id !== id))
    } catch (err) {
      console.error('Mark read failed:', err)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchNotes()
    const interval = setInterval(fetchNotes, 60000)
    return () => clearInterval(interval)
  }, [token])

  return { notes, markRead }
}

export default useNotifications
