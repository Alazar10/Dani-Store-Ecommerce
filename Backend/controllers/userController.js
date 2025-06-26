import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"
import { OAuth2Client } from 'google-auth-library'
import sendVerificationEmail from "../utils/sendVerificationEmail.js"
import { randomBytes } from 'crypto'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const loginnUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.status(201).json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error. Please try again later." })
    }
}


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" })
    }

    // Validate password
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[@$!%*?&#]/.test(password)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate email verification token
    const verifyToken = randomBytes(32).toString("hex")
    const verifyTokenExpiry = Date.now() + 1000 * 60 * 60 // 1 hour from now
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}&email=${email}`

    // Create user (unverified)
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verifyToken,
      verifyTokenExpiry,
    })

    // Send verification email
    await sendVerificationEmail(email, name, verificationLink)

    res.status(201).json({
      success: true,
      message: "User registered. A verification link has been sent to your email.",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
}



const verifyEmail = async (req, res) => {
  const { token, email } = req.query

  try {
    const user = await userModel.findOne({ email, verifyToken: token })

    if (!user || user.verifyTokenExpiry < Date.now()) {
      return res.status(400).send("Invalid or expired verification link.")
    }

    user.verified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    // Redirect to frontend with token for auto-login
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${jwtToken}`)
  } catch (error) {
    console.error("Email verification error:", error)
    res.status(500).send("Server error during verification.")
  }
}




const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Email or Password' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const googleAuth = async (req, res) => {
    const client = new OAuth2Client()
    const { token } = req.body

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const { email, name, sub: googleId } = payload

        let user = await userModel.findOne({ email })

        if (!user) {
            const randomPassword = googleId + process.env.JWT_SECRET.slice(0, 6) // dummy secret fallback
            const hashed = await bcrypt.hash(randomPassword, 10)
            user = await userModel.create({
                name,
                email,
                password: hashed
            })
        }

        const appToken = createToken(user._id)
        res.json({ success: true, token: appToken })
    } catch (err) {
        console.error('Google OAuth Error:', err)
        res.status(401).json({ success: false, message: 'Invalid Google token' })
    }
}

export { loginnUser, registerUser, adminLogin, googleAuth, verifyEmail }
