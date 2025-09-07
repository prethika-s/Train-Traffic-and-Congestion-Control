import { searchTrainsService, getTimetableService } from '../services/trains.service.js'
import { getLiveStatusService } from '../services/live.service.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const searchTrains = asyncHandler(async (req, res) => {
  const { from, to } = req.query
  const results = await searchTrainsService(from, to)
  res.json(results)
})

export const getLiveStatus = asyncHandler(async (req, res) => {
  const number = req.params.number
  const status = await getLiveStatusService(number)
  res.json(status)
})

export const getTimetable = asyncHandler(async (req, res) => {
  const number = req.params.number
  const timetable = await getTimetableService(number)
  res.json(timetable)
})
