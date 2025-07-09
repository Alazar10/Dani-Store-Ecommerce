// models/contactModel.js
import mongoose from 'mongoose'


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false } // ✅ new field
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default Contact
