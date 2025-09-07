import { getData } from './csv.service.js'
import { callMLService } from './ml.client.js'

export async function getLiveStatusService(number) {
  const trains = getData()
  const train = trains.find(t => t.Train_ID === number)
  if (!train) return null

  const ml = await callMLService(number)
  return {
    trainNo: train.Train_ID,
    trainName: train.Train_Name,
    status: ml.predictedDelay > 10 ? `Delayed ${ml.predictedDelay} mins` : 'On Time'
  }
}
