import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export class UsersController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = createUserBodySchema.parse(request.body)

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, passwordHash }
    })

    return reply.status(201).send()
  }
}
