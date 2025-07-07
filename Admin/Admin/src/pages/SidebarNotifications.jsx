import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

function SidebarNotifications({ token }) {
  const [notes, setNotes] = useState([])
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  const fetchNotes = async () => {
    if (!token) return
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) setNotes(data.notifications)
    } catch (err) {
      console.error('Fetch notifications failed:', err)
    }
  }

  const markRead = async (id) => {
    if (!token) return
    try {
      await axios.post(
        `${backendUrl}/api/notifications/read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes((prev) => prev.filter((n) => n._id !== id))
    } catch (err) {
      console.error('Mark read failed:', err)
    }
  }

  // Poll for new notifications every minute
  useEffect(() => {
    fetchNotes()
    const interval = setInterval(fetchNotes, 60000)
    return () => clearInterval(interval)
  }, [token])

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen((prev) => !prev)} className="relative">
        <BellIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        {notes.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {notes.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-80 bg-white shadow-lg rounded border z-30">
          <div className="p-2 border-b font-medium">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notes.length === 0 ? (
              <li className="p-3 text-gray-500 text-sm">No new notifications</li>
            ) : (
              notes.map((n) => (
                <li
                  key={n._id}
                  className="flex justify-between items-start p-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm text-black">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => markRead(n._id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Mark as read"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SidebarNotifications
