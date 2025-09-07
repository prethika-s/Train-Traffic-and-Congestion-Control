import mongoose from 'mongoose'

const journeySchema = new mongoose.Schema({
  number: String,
  name: String,
  from: String,
  to: String
})

export default mongoose.model('Journey', journeySchema)
