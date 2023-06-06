import { AppError } from '@/errors/AppError'
import { FastifyRequest } from 'fastify'

export async function verifyOrgJwtMiddleware(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch {
    throw new AppError({ statusCode: 401, message: 'Unauthorized' })
  }
}
