import 'dotenv/config';
import './database/connectdb.js'
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.json({ ok: true })
})

const POST = process.env.POST || 5000

app.listen(POST, () =>
  console.log(`Server started on port http://localhost:${POST}`)
)
