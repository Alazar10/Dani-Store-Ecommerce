import express from 'express'
import {listProduct, addProduct, removeProduct, singleProduct, updateProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import productModel from '../models/productModel.js';


const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProduct)
productRouter.post('/update', adminAuth, upload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1}]),
    updateProduct)

productRouter.get('/search', async (req, res) => {
  const { q } = req.query
  try {
    if (!q) return res.json({ success: true, products: [] })

    // Fully escape special regex characters (colon included)
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\:]/g, '\\$&')
    const safeRegex = new RegExp(escapedQuery, 'i')

    const results = await productModel.find({
      $or: [
        { name: { $regex: safeRegex } },
        { category: { $regex: safeRegex } },
        { description: { $regex: safeRegex } },
      ]
    })

    res.json({ success: true, products: results })
  } catch (err) {
    console.error("🔴 Search failed:", err.message)
    res.status(500).json({ success: false, message: 'Search crashed internally' })
  }
})

export  default productRouter
