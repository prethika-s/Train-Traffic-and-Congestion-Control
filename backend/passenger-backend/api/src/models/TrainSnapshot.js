import mongoose from 'mongoose'

const snapshotSchema = new mongoose.Schema({
  trainNo: String,
  status: String,
  ts: { type: Date, default: Date.now }
})

export default mongoose.model('TrainSnapshot', snapshotSchema)
