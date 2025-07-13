import express from 'express'
import { getUserNotifications, getUserNotificationCount, markAllAsRead, markNotificationAsRead } from '../controllers/userNotificationController.js'
import authUser from '../middleware/auth.js'

const userNotificationRouter = express.Router()

// Get all notifications for a user
userNotificationRouter.get('/', authUser, getUserNotifications)

// Get unread count
userNotificationRouter.get('/count', authUser, getUserNotificationCount)

// Mark all as read
userNotificationRouter.post('/mark-read', authUser, markAllAsRead)

userNotificationRouter.post('/mark-read/:notificationId', authUser, markNotificationAsRead)


export default userNotificationRouter
