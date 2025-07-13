import Newsletter from '../models/newsletterModel.js'
import Notifier from '../models/notifierModel.js'
import nodemailer from 'nodemailer'

// POST /api/send-notification
const sendNotifier = async (req, res) => {
  const { title, message, target } = req.body

  try {
    // ✅ Save for app notifications
    await Notifier.create({ title, message, target, date: Date.now() })

    // ✅ Email subscribers
    if (target === "subscribers") {
      const subscribers = await Newsletter.find({}, 'email')

      console.log("📧 Sending to subscribers:", subscribers.length)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      const emailHTML = `
        <div style="font-family: Arial, sans-serif; color: #333333; padding: 16px;">
          <h2 style="color: #FF8C00; margin-bottom: 8px;">${title}</h2>
          <p style="font-size: 15px;">${message}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999999;">
            You’re receiving this because you subscribed to Dani Store updates.<br/>
            <a href="#" style="color: #FF8C00;">Unsubscribe</a> anytime.
          </p>
        </div>
      `

      for (const sub of subscribers) {
        await transporter.sendMail({
          from: `"Dani Store 🧡" <${process.env.EMAIL_USER}>`,
          to: sub.email,
          subject: `📣 ${title}`,
          html: emailHTML
        })
      }
    }

    res.json({ success: true })
  } catch (err) {
    console.error("❌ Notification error:", err.message)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export default sendNotifier
