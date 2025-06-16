import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, size, quantity } = req.body;

    // Ensure files exist before accessing them
    const image1 = req.files.image1 && req.files.image1?.[0] 
    const image2 = req.files.image2 && req.files.image2?.[0] 
    const image3 = req.files.image3 && req.files.image3?.[0] 
    const image4 = req.files.image4 && req.files.image4?.[0] 

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'})
        return result.secure_url 
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      size,
      image: imagesUrl,
      quantity:Number(quantity),
      date: Date.now() 
    }

    console.log(productData)

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message:"Product Added" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async(req, res)=>{
  try{

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

    const product = await productModel.findById(id)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }

    // Upload new images if provided
    const imageUrls = [...product.image] // keep existing images

    for (let i = 1; i <= 4; i++) {
      const field = req.files?.[`image${i}`]?.[0]
      if (field) {
        const result = await cloudinary.v2.uploader.upload(field.path, {
          folder: 'products'
        })
        imageUrls[i - 1] = result.secure_url
      }
    }

    product.name = name
    product.description = description
    product.price = price
    product.category = category
    product.sizes = sizes
    product.quantity = quantity
    product.image = imageUrls

    await product.save()

    res.json({ success: true, message: "Product updated successfully" })
  } catch (err) {
    console.error("Update error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}

export {listProduct, addProduct, removeProduct, singleProduct, updateProduct}