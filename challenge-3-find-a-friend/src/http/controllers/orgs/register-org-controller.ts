import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrgService } from '@/services/factories/make-register-org-service'

const registerOrgBodySchema = z.object({
  accountable: z.string(),
  email: z.string().email(),
  zipCode: z.coerce.string().trim().length(8),
  address: z.string(),
  whatsapp: z.string().min(11).max(19),
  password: z.string().min(6)
})

export async function registerOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, accountable, address, whatsapp, zipCode, password } =
    registerOrgBodySchema.parse(request.body)

  const registerOrgService = makeRegisterOrgService()

  await registerOrgService.execute({
    accountable: accountable,
    address: address,
    whatsapp: whatsapp,
    zipCode: zipCode,
    email: email,
    password: password
  })

  return reply.status(201).send()
}
