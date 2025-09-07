import axios from 'axios'
import { config } from '../config/config.js'

export async function callMLService(trainNumber) {
  try {
    const { data } = await axios.post(config.mlServiceUrl, { trainNumber })
    return data
  } catch (err) {
    console.error('ML Service error', err.message)
    return { trainNumber, predictedDelay: 0 }
  }
}
