import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import { CepProvider } from '@/providers/CepProvider'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet, PetsRepository } from '@/repositories/pets-repository'

interface CreatePetServiceParams {
  name: string
  about: string
  birthdate: Date
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  photos: string[]
  org_id: string
}

interface CreatePetServiceReturn {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private cepProvider: CepProvider
  ) {}

  async execute(
    params: CreatePetServiceParams
  ): Promise<CreatePetServiceReturn> {
    const {
      about,
      birthdate,
      energy,
      independencyLevel,
      name,
      org_id,
      photos,
      size
    } = params

    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const city = await this.cepProvider.getCityByCep(org.zip_code)

    const pet = await this.petsRepository.create({
      about,
      birthdate,
      city,
      energy,
      independencyLevel,
      name,
      org_id,
      photos,
      size
    })

    return { pet }
  }
}
