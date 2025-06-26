import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import Notification from '../models/notificationModel.js'

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    // 1. Validate stock for every item
    for (const item of items) {
      const product = await productModel.findById(item._id)
      if (!product) {
        return res.json({ success: false, message: `Product not found` })
      }

      const matchedSize = product.sizes.find(s => s.label === item.size)
      if (!matchedSize) {
        return res.json({
          success: false,
          message: `Size "${item.size}" not found for ${product.name}`
        })
      }
      if (matchedSize.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Only ${matchedSize.stock} left for ${product.name} (${item.size})`
        })
      }
    }

    // 2. Save order if stock is valid
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      date: Date.now()
    }
    const newOrder = await new orderModel(orderData).save()

    // 2a. Emit a notification for admin
    await Notification.create({
      type:    'order_placed',
      message: `New order received (#${newOrder._id})`,
      meta:    { orderId: newOrder._id }
    })

    // 3. Deduct stock
    for (const item of items) {
      await productModel.updateOne(
        { _id: item._id, "sizes.label": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      )
    }

    // 4. Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    return res.json({ success: true, message: "Order placed successfully" })
  } catch (error) {
    console.error("❌ Order placement failed:", error)
    return res.json({ success: false, message: error.message })
  }
}







const placeOrderChapa = async (req, res) => {

}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 })
    return res
      .status(200)
      .json({ 
        success: true,   // ← fix spelling here
        orders 
      })
  } catch (error) {
    console.error('allOrders error:', error)
    return res
      .status(500)
      .json({ 
        success: false,  // ← and here
        message: error.message 
      })
  }
}

const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        res.json({ succes: false, message: error.message })
    }

}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        
        if (!orderId || !status) {
            return res
                .status(400)
                .json({ success: false, message: 'orderId and status are required' })
        }

        
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res
                .status(404)
                .json({ success: false, message: 'Order not found' })
        }

        order.status = status
        await order.save()

        
        res.json({
            success: true,
            message: 'Order status updated',
            order
        })
    } catch (error) {
        console.error('Error in updateStatus:', error)
        res
            .status(500)
            .json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderChapa, allOrders, userOrders, updateStatus }

