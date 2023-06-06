import { SearchPetsService } from '../search-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetsService() {
  const petsRepository = new PrismaPetsRepository()
  return new SearchPetsService(petsRepository)

}
