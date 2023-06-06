import { Pet, PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsServiceParams {
  city: string
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  independencyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  page: number
  pageSize?: number
}

interface SearchPetsServiceReturn {
  pets: Pet[]
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    params: SearchPetsServiceParams
  ): Promise<SearchPetsServiceReturn> {
    const { city, energy, independencyLevel, size, page, pageSize } = params

    const pets = await this.petsRepository.search({
      city,
      page,
      energy,
      independencyLevel,
      pageSize,
      size
    })

    return { pets }
  }
}
