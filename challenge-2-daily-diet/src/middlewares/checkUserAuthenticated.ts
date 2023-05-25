import { FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { authConfig } from '../config/authConfig'

export async function checkUserAuthenticated(request: FastifyRequest) {
  const authorization = request.headers['authorization']

  if (!authorization) {
    throw new AppError({ statusCode: 401, message: 'No auth token present' })
  }

  const [, authToken] = authorization.split('Bearer ')

  try {
    const jwtPayload = jwt.verify(authToken, authConfig.secret)
    const userId =
      typeof jwtPayload !== 'string' ? jwtPayload.userId : undefined

    if (!userId) {
      throw new AppError({ statusCode: 401, message: 'Invalid auth token' })
    }

    request.userId = userId
  } catch {
    throw new AppError({ statusCode: 401, message: 'Invalid auth token' })
  }
}

declare module 'fastify' {
  export interface FastifyRequest {
    userId: string
  }
}
