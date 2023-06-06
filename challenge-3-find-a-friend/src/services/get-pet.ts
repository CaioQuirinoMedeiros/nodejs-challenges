import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import { PetWithOrg, PetsRepository } from '@/repositories/pets-repository'

interface GetPetServiceParams {
  petId: string
}

interface GetPetServiceReturn {
  pet: PetWithOrg
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(params: GetPetServiceParams): Promise<GetPetServiceReturn> {
    const { petId } = params

    const pet = await this.petsRepository.findById({ petId })

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
