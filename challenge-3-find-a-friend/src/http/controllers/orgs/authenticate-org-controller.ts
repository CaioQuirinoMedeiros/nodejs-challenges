import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrgService } from '@/services/factories/make-authenticate-org-service'

const authenticateOrgBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateOrgBodySchema.parse(request.body)

  const authenticateService = makeAuthenticateOrgService()

  const { org } = await authenticateService.execute({
    email: email,
    password: password
  })

  const token = await reply.jwtSign({}, { sign: { sub: org.id } })

  return reply.send({ token, orgId: org.id })
}
