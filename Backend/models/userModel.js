import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },

  cartData: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ]
  }
}, { minimize: false })


const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel
