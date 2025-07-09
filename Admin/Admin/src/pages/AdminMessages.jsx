import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const AdminMessages = ({ token }) => {
  const [messages, setMessages] = useState([])

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/contact/messages`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (data.success) {
          setMessages(data.messages)
        } else {
          toast.error(data.message || 'Failed to load messages.')
        }
      } catch (err) {
        console.error('❌ Error fetching messages:', err)
        toast.error('Something went wrong while loading messages.')
      }
    }

    if (token) {
      fetchMessages()
    } else {
      toast.error('Unauthorized: Admin token missing.')
    }
  }, [token])

  // Delete a message
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/contact/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setMessages(messages.filter(msg => msg._id !== id))
        toast.success("Message deleted")
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to delete message")
    }
  }

  // Mark a message as read
const handleMarkAsRead = async (id) => {
  try {
    const res = await fetch(`${backendUrl}/api/contact/mark-read/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (data.success) {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === id ? { ...msg, read: true } : msg
        )
      )
    } else {
      toast.error(data.message || "Failed to mark as read")
    }
  } catch (err) {
    toast.error("Failed to mark as read")
  }
}


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📬 Contact Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`border p-4 rounded shadow-sm ${
                msg.read ? 'bg-white' : 'bg-yellow-50'
              }`}
            >
              <p className="font-semibold text-gray-800">{msg.name}</p>
              <p className="text-sm text-gray-600 mb-1">{msg.email}</p>
              <p className="text-gray-700 whitespace-pre-line">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                Sent on {new Date(msg.submittedAt).toLocaleString()}
              </p>

              <div className="flex gap-4 mt-3">
                {!msg.read && (
                  <button
                    onClick={() => handleMarkAsRead(msg._id)}
                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-red-600 text-sm hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminMessages
