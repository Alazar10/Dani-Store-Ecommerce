import express from 'express'
import authUser from '../middleware/auth.js'
import Notification from '../models/notificationModel.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()


router.get('/', adminAuth, async (req, res) => {
  try {
    const notes = await Notification.find({ read: false }).sort({ createdAt: -1 })
    res.json({ success: true, notifications: notes })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/read/:id', adminAuth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
