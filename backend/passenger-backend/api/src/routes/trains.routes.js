import express from 'express'
import { searchTrains, getLiveStatus, getTimetable } from '../controllers/trains.controller.js'

const router = express.Router()

router.get('/search', searchTrains)
router.get('/live/:number', getLiveStatus)
router.get('/timetable/:number', getTimetable)

export default router
