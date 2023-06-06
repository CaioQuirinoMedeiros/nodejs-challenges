import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import slugify from 'slugify'
import { pipeline } from 'node:stream'
import util from 'node:util'
import crypto from 'node:crypto'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import DiskStorageProvider from '@/providers/implementations/DiskStorageProvider'

const pump = util.promisify(pipeline)

const createPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  birthdate: z.coerce.date(),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH'])
})

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // const { about, birthdate, energy, independencyLevel, name, size } =
  //   createPetBodySchema.parse(request.body)

  // const files = await request.saveRequestFiles()
  const parts = request.parts()
  const dataBody: { [key: string]: any } = {}
  const photosBuffer: Array<{ filename: string; buffer: Buffer }> = []

  const storageProvider = new DiskStorageProvider()

  for await (const part of parts) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer()
      const fileHash = crypto.randomBytes(10).toString('hex')
      const finalFilename = `${fileHash}_${slugify(part.filename)}`
      photosBuffer.push({ filename: finalFilename, buffer })
    } else {
      const fieldKey = part.fieldname
      const fieldValue = part.value
      dataBody[fieldKey] = fieldValue
    }
  }

  const { about, birthdate, energy, independencyLevel, name, size } =
    createPetBodySchema.parse(dataBody)

  const createPetService = makeCreatePetService()

  photosBuffer.forEach((photoBuffer) => {
    storageProvider.saveFile(photoBuffer.filename, photoBuffer.buffer)
  })

  const { pet } = await createPetService.execute({
    about,
    birthdate,
    energy,
    independencyLevel,
    name,
    org_id: request.user.sub,
    photos: photosBuffer.map((photoBuffer) => photoBuffer.filename),
    size
  })

  return reply.status(201).send({ pet })
}
