// src/components/SidebarNotifications.jsx
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


function SidebarNotifications({ token }) {
  const [notes, setNotes] = useState([])
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  // Fetch unread notifications
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/notifications`,
        { headers: { token } }
      )
      if (data.success) setNotes(data.notifications)
    } catch (err) {
      console.error('Fetch notifications failed:', err)
    }
  }

  // Mark one as read
  const markRead = async (id) => {
    try {
      await axios.post(
        `${backendUrl}/api/notifications/read/${id}`,
        {},
        { headers: { token } }
      )
      setNotes(n => n.filter(x => x._id !== id))
    } catch (err) {
      console.error('Mark read failed:', err)
    }
  }

  // Poll on mount and every minute
  useEffect(() => {
    if (!token) return
    fetchNotes()
    const iv = setInterval(fetchNotes, 60 * 1000)
    return () => clearInterval(iv)
  }, [token])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell + badge */}
      <button onClick={() => setOpen(o => !o)} className="relative">
        <BellIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        {notes.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {notes.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-80 bg-white shadow-lg rounded border z-30">
          <div className="p-2 border-b font-medium">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notes.length === 0 && (
              <li className="p-2 text-gray-500 text-sm">
                No new notifications
              </li>
            )}
            {notes.map(n => (
              <li
                key={n._id}
                className="flex justify-between items-start p-2 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => markRead(n._id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default SidebarNotifications
