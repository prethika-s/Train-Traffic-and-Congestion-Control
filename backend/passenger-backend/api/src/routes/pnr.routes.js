import express from 'express'
import { getPNRStatus } from '../controllers/pnr.controller.js'

const router = express.Router()

router.get('/:pnr', getPNRStatus)

export default router
