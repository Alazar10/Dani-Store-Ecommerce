// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cron from 'node-cron'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

// Routes
import userRouter     from './routes/userRoute.js'
import productRouter  from './routes/productRoute.js'
import cartRouter     from './routes/callRoute.js'
import orderRouter    from './routes/orderRoute.js'
import notificationRouter from './routes/notificationRoutes.js'

// Models
import orderModel     from './models/orderModel.js'
import Notification   from './models/notificationModel.js'

/** ── App Config ────────────────────────────────────────────────────────── */
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

/** ── Middlewares ───────────────────────────────────────────────────────── */
app.use(express.json())
app.use(cors())

/** ── Cron Job: Unresponded Order Reminders ─────────────────────────────────
 * Every hour on the hour, find orders still in "Order Placed" older than 1h,
 * then emit a reminder notification if one hasn't already been sent in the
 * last hour for that specific order.
 */
cron.schedule('0 * * * *', async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    // find stale orders
    const staleOrders = await orderModel.find({
      status: 'Order Placed',
      date:   { $lte: oneHourAgo }
    })

    for (const order of staleOrders) {
      // avoid duplicate reminder in the past hour
      const alreadyReminded = await Notification.exists({
        type:    'order_reminder',
        'meta.orderId': order._id,
        createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }
      })

      if (!alreadyReminded) {
        await Notification.create({
          type:    'order_reminder',
          message: `Order #${order._id} has not been responded to in over an hour`,
          meta:    { orderId: order._id }
        })
      }
    }
  } catch (err) {
    console.error('❌ Cron (order_reminder) error:', err)
  }
})

/** ── API Endpoints ──────────────────────────────────────────────────────── */
app.use('/api/user',          userRouter)
app.use('/api/product',       productRouter)
app.use('/api/cart',          cartRouter)
app.use('/api/order',         orderRouter)
app.use('/api/notifications', notificationRouter)

app.get('/', (req, res) => res.send('API Working'))

/** ── Start Server ───────────────────────────────────────────────────────── */
app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`)
})
