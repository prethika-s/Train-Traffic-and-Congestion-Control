import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import trainsRoutes from './routes/trains.routes.js'
import pnrRoutes from './routes/pnr.routes.js'
import journeysRoutes from './routes/journeys.routes.js'
import alertsRoutes from './routes/alerts.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()
export const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/trains', trainsRoutes)
app.use('/api/pnr', pnrRoutes)
app.use('/api/journeys', journeysRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/notifications', notificationsRoutes)

app.use(errorHandler)
