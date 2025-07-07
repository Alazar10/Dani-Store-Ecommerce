// middleware/authUser.js
import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
  // 1) get token from either Authorization or a custom header
  const authHeader = req.header('Authorization') || req.headers.token
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized. No token.' })
  }

  // 2) strip off "Bearer " if present
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim()

  try {
    // 3) verify & attach
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id || decoded.userId, role: decoded.role }
    return next()
  } catch (err) {
    console.error('Auth error:', err)
    return res
      .status(403)
      .json({ success: false, message: 'Invalid or expired token.' })
  }
}

export default authUser
