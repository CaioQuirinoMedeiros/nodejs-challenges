import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { uploadConfig } from '@/config/uploadConfig'

const getPetPhotoParamsSchema = z.object({
  photo: z.string()
})

export async function getPetPhotoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { photo } = getPetPhotoParamsSchema.parse(request.params)

  return reply.sendFile(photo, uploadConfig.uploadsFolder)
}
