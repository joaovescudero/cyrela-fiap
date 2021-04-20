import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import logger from 'morgan'

import { NotFoundError } from './errors/notFoundError'
import { errorHandler } from './middlewares/errorHandler'
import * as controllers from './controllers'

import pgConnect from './lib/postgres'

const app = express()

const pgConnection = pgConnect()
app.use((req, res, next) => {
  req.db = pgConnection
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(logger('dev'))

app.use(controllers.activity.default)
app.use(controllers.ocurrences.default)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Listening on 3000`)
})
