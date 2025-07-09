// controllers/newsletterController.js
import Newsletter from '../models/newsletterModel.js'
import sendSubscriptionConfirmation  from '../utils/sendEmail.js'

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' })
    }

    const existing = await Newsletter.findOne({ email })
    if (existing) {
      return res.status(409).json({ success: false, message: 'This email is already subscribed.' })
    }

    await Newsletter.create({ email })
    await sendSubscriptionConfirmation(email)

    return res.status(200).json({ success: true, message: 'Subscribed successfully! Confirmation email sent.' })
  } catch (error) {
    console.error('🔥 Newsletter subscription error:', error)
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' })
  }
}

export default subscribeNewsletter
