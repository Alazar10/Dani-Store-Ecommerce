// utils/sendEmail.js
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS  // your Gmail app password
  }
})

const sendSubscriptionConfirmation = async (email) => {
  await transporter.sendMail({
    from: `"Dani Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'You’re subscribed to Dani Store 🛍️',
    html: `
      <h2>Welcome to Dani Store!</h2>
      <p>Thanks for subscribing to our newsletter. 🎉</p>
      <p>You’ll now receive exclusive offers, early product drops, and fitness tips straight to your inbox.</p>
      <p>Stay tuned!</p>
      <br/>
      <em>— The Dani Store Team</em>
    `
  })
}
export default sendSubscriptionConfirmation
