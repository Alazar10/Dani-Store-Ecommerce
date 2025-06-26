import nodemailer from 'nodemailer'

const sendVerificationEmail = async (email, name, link) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Dani Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for signing up! Please click the link below to verify your email:</p>
      <a href="${link}">Verify Email</a>
      <p>This link will expire in 1 hour.</p>
    `,
  })
}

export default sendVerificationEmail
