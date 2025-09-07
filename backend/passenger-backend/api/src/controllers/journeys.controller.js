import Journey from '../models/Journey.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const listJourneys = asyncHandler(async (req, res) => {
  const journeys = await Journey.find()
  res.json(journeys)
})

export const addJourney = asyncHandler(async (req, res) => {
  const journey = await Journey.create(req.body)
  res.status(201).json(journey)
})

export const removeJourney = asyncHandler(async (req, res) => {
  const { number } = req.params
  await Journey.deleteOne({ number })
  res.json({ success: true })
})
