import 'dotenv/config'
import './database/connectdb.js'
import express from 'express'
import authRouter from './routes/auth.route.js'

const app = express()

app.use(express.json())
app.use('/api/v1', authRouter)

const POST = process.env.POST || 5000

app.listen(POST, () =>
  console.log(`Server started on port http://localhost:${POST}`)
)
