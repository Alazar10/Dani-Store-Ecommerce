import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
import Notification from '../models/notificationModel.js'

const addToCart = async (req, res) => {
  try {
    console.log("🛬 /api/cart/add hit")

    const userId = req.user.id
    const { productId, size, quantity } = req.body

    if (!productId || !size || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Invalid input data' })
    }

    const product = await productModel.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    const sizeObj = product.sizes.find(s => s.label === size)
    if (!sizeObj) {
      return res.status(400).json({ success: false, message: 'Size not available' })
    }

    if (sizeObj.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${sizeObj.stock} left for size "${size}"`
      })
    }

    // Decrement stock
    await productModel.updateOne(
      { _id: productId, 'sizes.label': size },
      { $inc: { 'sizes.$.stock': -quantity } }
    )

    // Trigger out-of-stock notification
    if (sizeObj.stock - quantity <= 0) {
      await Notification.create({
        type: 'out_of_stock',
        message: `Product "${product.name}" is now out of stock (size ${size})`,
        meta: { productId, sizeLabel: size }
      })
    }

    // Add to user cart
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    if (!user.cartData) user.cartData = { items: [] }

    const existing = user.cartData.items.find(
      item => item.productId.toString() === productId && item.size === size
    )

    if (existing) {
      existing.quantity += quantity
    } else {
      user.cartData.items.push({ productId, size, quantity })
    }

    await user.save()

    console.log("✅ Cart saved:", user.cartData.items)

    return res.json({ success: true, message: 'Added to cart', cartData: user.cartData })
  } catch (err) {
    console.error('🔥 addToCart error:', err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, size, quantity } = req.body

    // Validate input
    if (!productId || !size || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: productId, size, and quantity are required'
      })
    }

    // Fetch user
    const user = await userModel.findById(userId)
    if (!user || !user.cartData || !Array.isArray(user.cartData.items)) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      })
    }

    // Debug logs
    console.log("📦 Incoming update payload:", { productId, size, quantity })
    console.log("🛒 Existing cart items:", user.cartData.items.map(i => ({
      productId: i.productId?.toString(),
      size: i.size,
      quantity: i.quantity
    })))

    // Find the matching item
    const item = user.cartData.items.find(
      it => it.productId.toString() === productId && it.size === size
    )

    if (!item) {
      return res.status(400).json({
        success: false,
        message: 'Item not found in cart'
      })
    }

    // Update quantity
    item.quantity = quantity
    await user.save()

    return res.json({
      success: true,
      message: 'Cart updated successfully',
      cartData: user.cartData
    })
  } catch (error) {
    console.error('🔥 updateCart error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userModel.findById(userId)
    res.json({ success: true, cartData: user.cartData || { items: [] } })
  } catch (error) {
    console.error('getUserCart error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export { addToCart, updateCart, getUserCart }
