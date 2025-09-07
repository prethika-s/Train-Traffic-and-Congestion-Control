import express from 'express'
import { streamNotifications } from '../services/notifications.service.js'

const router = express.Router()

router.get('/stream', streamNotifications)

export default router
