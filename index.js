import 'dotenv/config'
import './database/connectdb.js'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import redirectRouter from './routes/redirect.route.js'

const app = express()

// // middlewares

// const whitelist = [process.env.ORIGIN1]


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (whitelist.includes(origin)) {
//         return callback(null, origin)
//       }
//       return callback('origin:' +  origin + 'not authorized')
//     }
//   })
// )
app.use(express.json())
app.use(cookieParser())

// app.use(express.static('public'))

// Routes
app.use('/', redirectRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

const POST = process.env.POST || 8800

app.listen(POST, () =>
  console.log(`Server started on port http://localhost:${POST}`)
)
