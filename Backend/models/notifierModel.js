import mongoose from 'mongoose'

const notifierSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  target: {
    type: String,
    enum: ['all', 'users', 'subscribers'],
    default: 'all'
  },
  date: {
    type: Date,
    default: Date.now
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // optional: track who sent it
    required: false
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Notifier = mongoose.model('Notifier', notifierSchema)

export default Notifier
