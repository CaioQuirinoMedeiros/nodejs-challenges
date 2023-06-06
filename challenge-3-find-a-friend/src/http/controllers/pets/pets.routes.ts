import { FastifyInstance } from 'fastify'

import { verifyOrgJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'
import { searchPetsController } from './search-pets-controller'
import { createPetController } from './create-pet-controller'
import { getPetController } from './get-pet-controller'
import { getPetPhotoController } from './get-pet-photo-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets/create',
    { onRequest: verifyOrgJwtMiddleware },
    createPetController
  )
  app.get('/pets', searchPetsController)
  app.get('/pets/:petId', getPetController)
  app.get('/pet/photos/:photo', getPetPhotoController)
}
