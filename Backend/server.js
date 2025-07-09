import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cron from 'node-cron'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

// Routes
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/callRoute.js'   
import orderRouter from './routes/orderRoute.js'
import notificationRouter from './routes/notificationRoutes.js'
import newsletterRoute from './routes/newsletterRoute.js'
import contactRoute from './routes/contactRoute.js'

// Models for cron logic
import orderModel from './models/orderModel.js'
import Notification from './models/notificationModel.js'
import authUser from './middleware/auth.js'
import shopRouter from './routes/shopRoute.js'



const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

// Cron: Notify admin about unresponded orders
cron.schedule('0 * * * *', async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const staleOrders = await orderModel.find({
      status: 'Order Placed',
      date: { $lte: oneHourAgo }
    })

    for (const order of staleOrders) {
      const alreadyReminded = await Notification.exists({
        type: 'order_reminder',
        'meta.orderId': order._id,
        createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }
      })
      if (!alreadyReminded) {
        await Notification.create({
          type: 'order_reminder',
          message: `Order #${order._id} has not been responded to in over an hour`,
          meta: { orderId: order._id }
        })
      }
    }
  } catch (err) {
    console.error('❌ Cron error:', err)
  }
})

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/notifications', notificationRouter)
app.use('/api/shop', shopRouter)

app.use('/api/contact', contactRoute)
app.use('/api/newsletter', newsletterRoute)



app.get('/', (req, res) => res.send('API Working'))

app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`))
