/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify, { FastifyInstance } from 'fastify'
import * as dotenv from 'dotenv'
dotenv.config()
import Mongodb from './plugins/mongoose'
import { healthcheckRoutes } from './routes/healthcheckRoutes'
import { dealsRoutes } from './routes/dealsRoutes'

new Mongodb()

const app: FastifyInstance = Fastify({})

app.register(healthcheckRoutes.params)
app.register(dealsRoutes.params, { prefix: '/deals' })

export { app }
