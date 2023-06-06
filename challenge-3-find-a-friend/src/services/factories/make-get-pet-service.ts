import { GetPetService } from '../get-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetService() {
  const petsRepository = new PrismaPetsRepository()
  return new GetPetService(petsRepository)

}
