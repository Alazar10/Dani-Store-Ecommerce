// backend/routes/notificationRoutes.js
import express from 'express'
import authUser from '../middleware/auth.js'
import Notification from '../models/notificationModel.js'

const router = express.Router()

// GET all unread notifications
router.get('/', authUser, async (req, res) => {
  const notes = await Notification.find({ read:false }).sort({ createdAt:-1 })
  res.json({ success:true, notifications: notes })
})

// POST /read/:id  → mark a single notification as read
router.post('/read/:id', authUser, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read:true })
  res.json({ success:true })
})

export default router
