import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Notifier = ({ token }) => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [target, setTarget] = useState("all")

  const handleSend = async () => {
    if (!title || !message) {
      toast.error("Title and message are required.")
      return
    }

    try {
      const res = await axios.post(`${backendUrl}/api/notify/send`, { title, message, target }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success("Notification sent")
        setTitle("")
        setMessage("")
      } else {
        toast.error("Failed to send notification")
      }
    } catch (err) {
      console.error("Send error:", err)
      toast.error("Something went wrong.")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black rounded shadow-md border border-gray-300">
      <h2 className="text-xl font-bold mb-4">📣 Send Notification</h2>

      <label className="block text-sm mb-1 font-medium">Target Audience</label>
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full mb-4 p-2 border border-[#FF8C00] text-black bg-white rounded focus:outline-none focus:border-orange-500"
      >
        <option value="all">All Registered</option>
        <option value="users">Frontend Users Only</option>
        <option value="subscribers">Subscribers via Email</option>
      </select>

      <label className="block text-sm mb-1 font-medium">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Notification title"
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
      />

      <label className="block text-sm mb-1 font-medium">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        rows={4}
        className="w-full mb-4 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-orange-500"
      />

      <button
        onClick={handleSend}
        className="bg-[#FF8C00] text-white font-semibold px-4 py-2 rounded hover:bg-orange-500 transition"
      >
        Send Notification
      </button>
    </div>
  )
}

export default Notifier
