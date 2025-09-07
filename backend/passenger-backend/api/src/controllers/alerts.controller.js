import Alert from '../models/Alert.js'
import { pushNotification } from '../services/notifications.service.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const listAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find().sort({ ts: -1 })
  res.json(alerts)
})

export const addAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.create(req.body)
  pushNotification({ message: alert.text })
  res.status(201).json(alert)
})

export const clearAlerts = asyncHandler(async (req, res) => {
  await Alert.deleteMany({})
  res.json({ success: true })
})
