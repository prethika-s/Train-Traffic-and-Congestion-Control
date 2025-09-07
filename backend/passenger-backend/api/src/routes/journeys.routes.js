import express from 'express'
import { listJourneys, addJourney, removeJourney } from '../controllers/journeys.controller.js'

const router = express.Router()

router.get('/', listJourneys)
router.post('/', addJourney)
router.delete('/:number', removeJourney)

export default router
