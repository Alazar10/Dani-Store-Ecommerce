import express from 'express'
import { loginnUser, registerUser, adminLogin, googleAuth, verifyEmail} from '../controllers/userController.js'
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginnUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/google-auth', googleAuth)
userRouter.get('/verify-email', verifyEmail)
userRouter.get('/me', authUser, (req, res) => {
  res.json({ success: true, userId: req.user.id })
})


export default userRouter;