import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js"
import Notification from '../models/notificationModel.js'

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, quantity } = req.body

    // Handle uploaded images safely
    const image1 = req.files.image1?.[0]
    const image2 = req.files.image2?.[0]
    const image3 = req.files.image3?.[0]
    const image4 = req.files.image4?.[0]

    const images = [image1, image2, image3, image4].filter(Boolean)

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image'
        })
        return result.secure_url
      })
    )

    // 🔍 Parse and normalize sizes
    let parsedSizes = sizes
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes)
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Sizes must be a valid JSON array"
        })
      }
    }

    // 🔢 Convert numeric strings to real numbers
    parsedSizes = parsedSizes.map((s) => ({
      label: s.label,
      price: Number(s.price),
      stock: Number(s.stock)
    }))

    // Assemble product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      sizes: parsedSizes,
      image: imagesUrl,
      quantity: Number(quantity),
      date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product Added" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}


const listProduct = async(req, res)=>{
  try{

    console.log("🧪 /product/list hit")
    console.log("🔍 Headers received:", req.headers)

    const products = await productModel.find({});
    res.json({ success: true, product: products })
    



  } catch(error){
    console.log(error)
    res.json({ success: false, message: error.message})
  } 


}

const removeProduct = async(req, res)=>{
    try {

      await productModel.findByIdAndDelete(req.body.id)
      res.json({success:true, message:"Product Removed"})

    } catch (error) {

      console.log(error)
      res.json({ success: false, message: error.message})

    }
}

const singleProduct = async (req, res) => {
  try {
    const { id } = req.body
    const product = await productModel.findById(id)
    if (!product) {
      return res.json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, category, sizes, quantity } = req.body

    // 1. Find existing product
    const product = await productModel.findById(id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" })
    }

    // 2. Parse sizes payload
    let parsedSizes = sizes
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes)
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid sizes format" })
      }
    }
    parsedSizes = parsedSizes.map(s => ({
      label: s.label,
      price: Number(s.price),
      stock: Number(s.stock)
    }))

    // 3. Handle image uploads
    const imageUrls = [...(product.image || [])]
    for (let i = 1; i <= 4; i++) {
      const file = req.files?.[`image${i}`]?.[0]
      if (file) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: 'products'
        })
        imageUrls[i - 1] = result.secure_url
      }
    }

    // 4. Update product fields
    product.name        = name
    product.description = description
    product.price       = Number(price)
    product.category    = category
    product.sizes       = parsedSizes
    product.quantity    = Number(quantity)
    product.image       = imageUrls

    await product.save()

    // 2b. Emit "out_of_stock" notifications for any size at zero stock
    for (const sizeObj of parsedSizes) {
      if (sizeObj.stock <= 0) {
        // avoid duplicate notifications in last hour
        const recent = await Notification.exists({
          type: 'out_of_stock',
          'meta.productId': product._id,
          'meta.sizeLabel': sizeObj.label,
          createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) }
        })
        if (!recent) {
          await Notification.create({
            type:    'out_of_stock',
            message: `Product "${product.name}" is out of stock for size "${sizeObj.label}"`,
            meta:    { productId: product._id, sizeLabel: sizeObj.label }
          })
        }
      }
    }

    // 5. Respond success
    res.json({ success: true, message: "Product updated successfully" })
  } catch (err) {
    console.error("UpdateProduct error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}
export {listProduct, addProduct, removeProduct, singleProduct, updateProduct}