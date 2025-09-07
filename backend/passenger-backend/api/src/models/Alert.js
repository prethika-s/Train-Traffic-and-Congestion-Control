import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
  trainNo: String,
  text: String,
  ts: { type: Date, default: Date.now }
})

export default mongoose.model('Alert', alertSchema)
