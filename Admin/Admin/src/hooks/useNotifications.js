// src/hooks/useNotifications.js
import { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

function useNotifications(token) {
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const { data } = await axios.get(
      `${backendUrl}/api/notifications`,
      { headers:{ Authorization:`Bearer ${token}` } }
    )
    if (data.success) setNotes(data.notifications)
  }

  const markRead = async (id) => {
    await axios.post(
      `${backendUrl}/api/notifications/read/${id}`,
      {},
      { headers:{ Authorization:`Bearer ${token}` } }
    )
    setNotes(ns => ns.filter(n => n._id !== id))
  }

  useEffect(() => {
    if (!token) return
    fetchNotes()
    const iv = setInterval(fetchNotes, 60*1000)   // poll every minute
    return () => clearInterval(iv)
  }, [token])

  return { notes, markRead }
}

export default useNotifications
