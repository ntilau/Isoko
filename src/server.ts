import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRouter)

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('SMERGERS Clone API is running!')
})

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})