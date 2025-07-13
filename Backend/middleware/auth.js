import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
  const authHeader = req.header('Authorization') || req.headers.token
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Not authorized. No token.' })
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim()

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // ✅ Place this log here to inspect payload
    console.log("🧩 Decoded token:", decoded)

    req.user = { id: decoded.id || decoded.userId, role: decoded.role }
    return next()
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' })
  }
}

export default authUser
