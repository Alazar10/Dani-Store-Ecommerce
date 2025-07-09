// routes/contactRoute.js
import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { deleteMessage, getAllMessages, getUnreadCount, markMessageAsRead, submitContactForm } from '../controllers/contactController.js'

const router = express.Router()

router.post('/submit', submitContactForm)
router.get('/messages', adminAuth, getAllMessages) 
router.get('/unread-count', adminAuth, getUnreadCount)
router.patch('/mark-read/:id', adminAuth, markMessageAsRead)
router.delete('/delete/:id', adminAuth, deleteMessage)
router.patch('/reset-unread', adminAuth, async (req, res) => {
  try {
    await Contact.updateMany({ read: false }, { $set: { read: true } })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset unread messages' })
  }
})



export default router
