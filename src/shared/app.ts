/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify, { FastifyInstance } from 'fastify'
import * as dotenv from 'dotenv'
dotenv.config()
import { healthcheckRoutes } from './routes/healthcheckRoutes'
import Mongodb from './plugins/mongoose'

new Mongodb();

const app: FastifyInstance = Fastify({})

app.register(healthcheckRoutes.params)

export { app }
