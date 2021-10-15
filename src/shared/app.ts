/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify, { FastifyInstance } from 'fastify'
import * as dotenv from 'dotenv'
dotenv.config()
import { healthcheckRoutes } from './routes/healthcheckRoutes'

const app: FastifyInstance = Fastify({})

app.register(healthcheckRoutes.params)

export { app }
