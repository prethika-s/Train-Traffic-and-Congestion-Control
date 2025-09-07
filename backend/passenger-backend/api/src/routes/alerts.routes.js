import express from 'express'
import { listAlerts, addAlert, clearAlerts } from '../controllers/alerts.controller.js'

const router = express.Router()

router.get('/', listAlerts)
router.post('/', addAlert)
router.delete('/', clearAlerts)

export default router
y