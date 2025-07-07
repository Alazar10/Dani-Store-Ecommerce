// controllers/shopController.js
import Product from '../models/productModel.js'

export const getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json({ success: true, products })
  } catch (err) {
    console.error('❌ getPublicProducts error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
