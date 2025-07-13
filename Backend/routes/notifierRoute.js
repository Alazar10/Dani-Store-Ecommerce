import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import sendNotifier from '../controllers/notifierController.js'


const notifierRouter = express.Router()

notifierRouter.post('/send', adminAuth, sendNotifier)

export default notifierRouter
