import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import { transformListPets } from '@/repositories/pets-functions'

const searchGymsQuerySchema = z.object({
  city: z.string(),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']).nullable().optional(),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable().optional(),
  independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().nullable().optional()
})

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { city, energy, independencyLevel, size, page, pageSize } =
    searchGymsQuerySchema.parse(request.query)

  const searchPetsRepository = makeSearchPetsService()

  const { pets } = await searchPetsRepository.execute({
    city: city,
    energy: energy ?? undefined,
    size: size ?? undefined,
    independencyLevel: independencyLevel ?? undefined,
    page: page,
    pageSize: pageSize ?? undefined
  })

  return reply.send({
    pets: pets.map(transformListPets)
  })
}
