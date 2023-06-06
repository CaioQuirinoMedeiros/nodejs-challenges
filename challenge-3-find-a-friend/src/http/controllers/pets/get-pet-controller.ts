import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import { transformPetDetails } from '@/repositories/pets-functions'

const getPetParamsSchema = z.object({
  petId: z.string()
})

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { petId } = getPetParamsSchema.parse(request.params)

  const getPetService = makeGetPetService()

  const { pet } = await getPetService.execute({ petId })

  return reply.send({ pet: transformPetDetails(pet) })
}
