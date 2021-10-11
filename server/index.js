import express from 'express'
import cors from 'cors'
import {exec} from 'child_process'
import {promises as fs} from 'fs'

const app = express()
app.use(cors())
app.listen(3100, () => console.log(`Server is listening`))

app.get('/', async (req, res) => {
  const {data, languageEngine} = req.query
  await fs.writeFile('server/script', decodeURIComponent(data))

  exec(languageEngine + ' server/script', (err, stdout, stderr) => {
    // commands like library(tidyverse) that have a console message
    //  but no formal output are interpreted by exec as stderr
    // the next line just checks to use stderr if there is no stdout (if stdout === '')
    const result = stdout || stderr
    res.send(result)
  })
})
