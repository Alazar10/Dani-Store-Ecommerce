// backend/models/notificationModel.js
import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  type:       { type: String, enum:['out_of_stock','order_placed','order_reminder'], required:true },
  message:    { type: String, required:true },
  meta:       {                  // any extra info (orderId, productId)
    orderId:    { type: mongoose.Types.ObjectId, ref:'Order' },
    productId:  { type: mongoose.Types.ObjectId, ref:'Product' }
  },
  read:       { type: Boolean, default:false },
  createdAt:  { type: Date, default: Date.now }
})

export default mongoose.model('Notification', notificationSchema)
