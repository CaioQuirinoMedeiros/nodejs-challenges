import { fastify } from 'fastify'
import path from 'node:path'
import { AppError } from './errors/AppError'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { orgsRoutes } from './http/controllers/orgs/orgs.routes'
import { petsRoutes } from './http/controllers/pets/pets.routes'
import { uploadConfig } from './config/uploadConfig'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '7d' }
})
app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})


app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.issues
    })
  } else if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      name: error.constructor?.name,
      message: error.message
    })
  } else {
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // TODO: Here we should log to an external tool (DataDog/NewRelic/Sentry)
    }

    reply.status(500).send({
      message: error.message
    })
  }
})
