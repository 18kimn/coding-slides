import express from 'express'
import cors from 'cors'
import {exec} from 'child_process'
import {promises as fs} from 'fs'
import path from 'path'
import dotenv from 'dotenv'

const __filename = process.argv[1]
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
app.use(cors())

const {NODE_ENV, SERVER_PORT} = process.env
app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port ${SERVER_PORT}, env is ${NODE_ENV}`),
)

app.get('/', async (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/src', async (req, res) => {
  const {data, languageEngine} = req.query
  await fs.writeFile('server/script', decodeURIComponent(data))

  exec(languageEngine + ' server/script', (err, stdout, stderr) => {
    const result = stdout || stderr
    res.send(result)
  })
})
