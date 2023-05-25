import fastify from 'fastify'

import { usersRoutes } from './routes/usersRoutes'
import { authRoutes } from './routes/authRoutes'
import { mealsRoutes } from './routes/mealsRoutes'
import { AppError } from './errors/AppError'
import { z } from 'zod'

export const app = fastify()

app.register(usersRoutes, { prefix: 'users' })
app.register(authRoutes, { prefix: 'auth' })
app.register(mealsRoutes, { prefix: 'meals' })

app.setErrorHandler(function (error, request, reply) {
  this.log.error(error)
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({ errorMessage: error.message })
  } else if (error instanceof z.ZodError) {
    reply
      .status(400)
      .send({ errorMessage: 'Validation error', issues: error.issues })
  } else {
    reply.status(500).send(error)
  }
})
