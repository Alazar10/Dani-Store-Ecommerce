import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const raw = req.headers.authorization // should be: "Bearer <token>"
        const token = raw?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized: Login Again" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded token:", decoded)

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied: Admins only" })
        }

        req.user = decoded // optional, in case you want to use the admin info later
        next()
    } catch (error) {
        console.error("adminAuth error:", error)
        res.status(401).json({ success: false, message: "Invalid or expired token" })
    }
}


export default adminAuth