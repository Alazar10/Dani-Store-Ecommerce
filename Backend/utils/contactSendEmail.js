
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS  // your App Password
  }
})

const sendContactNotification = async ({ name, email, message }) => {
  await transporter.sendMail({
    from: `"Dani Store Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
    subject: `📩 New Contact Message from ${name}`,
    html: `
      <h3>You've received a new message:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  })
}
export default sendContactNotification
