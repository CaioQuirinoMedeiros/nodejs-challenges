import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { AppError } from '../errors/AppError'
import { authConfig } from '../config/authConfig'

const prisma = new PrismaClient()

const loginBodySchema = z.object({
  email: z.string(),
  password: z.string()
})

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = loginBodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      throw new AppError({ message: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new AppError({ message: 'Incorrect password' })
    }

    const token = jwt.sign({ userId: user.id }, authConfig.secret, {
      expiresIn: '7d'
    })

    return reply.send({ token })
  }
}
