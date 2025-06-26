import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number }, // Base price (optional but useful)
  image: { type: [String], required: true },
  category: { type: String, required: true },
  sizes: [
    {
      label: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true }
    }
  ],
  quantity: { type: Number }, // Optional: total stock for search/display
  date: { type: Number, required: true }
})


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel

