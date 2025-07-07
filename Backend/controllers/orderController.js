import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import Notification from '../models/notificationModel.js'

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id
    const { items, amount, address } = req.body

    for (const item of items) {
      const product = await productModel.findById(item._id)
      if (!product) return res.json({ success: false, message: `Product not found` })

      const matchedSize = product.sizes.find(s => s.label === item.size)
      if (!matchedSize) return res.json({
        success: false,
        message: `Size "${item.size}" not found for ${product.name}`
      })
      if (matchedSize.stock < item.quantity) {
        return res.json({
          success: false,
          message: `Only ${matchedSize.stock} left for ${product.name} (${item.size})`
        })
      }
    }

    const newOrder = await new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      date: Date.now()
    }).save()

    await Notification.create({
      type: 'order_placed',
      message: `New order received (#${newOrder._id})`,
      meta: { orderId: newOrder._id }
    })

    for (const item of items) {
      await productModel.updateOne(
        { _id: item._id, "sizes.label": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      )
    }

    await userModel.findByIdAndUpdate(userId, { cartData: { items: [] } })

    res.json({ success: true, message: "Order placed successfully" })
  } catch (error) {
    console.error("❌ Order placement failed:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const userOrders = async (req, res) => {
  try {
    const userId = req.user.id
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 })
    res.status(200).json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'orderId and status are required' })
    }

    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.status = status
    await order.save()

    res.json({ success: true, message: 'Order status updated', order })
  } catch (error) {
    console.error('Error in updateStatus:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const placeOrderChapa = async (req, res) => {
  res.json({ success: false, message: 'Chapa integration not implemented yet' })
}

export { placeOrder, placeOrderChapa, allOrders, userOrders, updateStatus }
