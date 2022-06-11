import 'dotenv/config'
import './database/connectdb.js'
import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api/v1/auth', authRouter)

const POST = process.env.POST || 8800

app.listen(POST, () =>
  console.log(`Server started on port http://localhost:${POST}`)
)
