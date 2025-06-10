import express from 'express'
import { loginnUser, registerUser, adminLogin} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginnUser)
userRouter.post('/admin', adminLogin)

export default userRouter;