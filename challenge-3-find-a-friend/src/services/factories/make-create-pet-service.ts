import { ViaCepCepProvider } from '@/providers/implementations/ViaCepCepProvider'
import { CreatePetService } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const cepProvider = new ViaCepCepProvider()

  return new CreatePetService(petsRepository, orgsRepository, cepProvider)
}
