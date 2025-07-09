// controllers/contactController.js
import Contact from '../models/contactModel.js'
import sendContactNotification from '../utils/contactSendEmail.js'


const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body
    console.log("📨 Incoming contact form:", { name, email, message })

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    // Save to DB
    const saved = await Contact.create({ name, email, message })
    console.log("✅ Message saved:", saved)

    // Send email
    await sendContactNotification({ name, email, message })
    console.log("✅ Email sent")

    return res.status(200).json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('🔥 Contact form error:', error)
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' })
  }
}

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ submittedAt: -1 })
    return res.status(200).json({ success: true, messages })
  } catch (error) {
    console.error('🔥 Failed to fetch messages:', error)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params
    await Contact.findByIdAndUpdate(id, { read: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to mark as read' })
  }
}

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params
    await Contact.findByIdAndDelete(id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message' })
  }
}

const getUnreadCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments({ read: false })
    res.json({ success: true, count })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to count messages' })
  }
}

export {submitContactForm, getAllMessages, markMessageAsRead, deleteMessage, getUnreadCount}

