import { randomUUID } from 'node:crypto'
import {
  Pet,
  PetCreateInput,
  PetFindByIdInput,
  PetSearchInput,
  PetWithOrg,
  PetsRepository
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async search(input: PetSearchInput): Promise<Pet[]> {
    const { city, page, energy, independencyLevel, pageSize = 20, size } = input

    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize

    return this.pets.slice(startIndex, endIndex).filter((pet) => {
      const matchCity =
        pet.city.toLowerCase().trim() === city.toLowerCase().trim()
      const matchSize = size ? size === pet.size : true
      const matchEnergy = energy ? energy === pet.energy : true
      const matchIndependencyLevel = independencyLevel
        ? independencyLevel === pet.independencyLevel
        : true

      return matchCity || matchSize || matchEnergy || matchIndependencyLevel
    })
  }

  async findById(input: PetFindByIdInput): Promise<PetWithOrg | null> {
    const { petId } = input

    const pet = this.pets.find((gym) => {
      return gym.id === petId
    })

    if (!pet) return null

    return {
      ...pet,
      org: {
        accountable: '',
        address: '',
        created_at: new Date(),
        email: '',
        id: pet.org_id,
        whatsapp: '',
        zip_code: ''
      }
    }
  }

  async create(input: PetCreateInput): Promise<Pet> {
    const {
      about,
      birthdate,
      city,
      energy,
      independencyLevel,
      name,
      org_id,
      photos,
      size,
      id
    } = input

    const pet: Pet = {
      id: id ?? randomUUID(),
      name: name,
      about: about,
      city: city,
      energy: energy,
      size: size,
      independencyLevel: independencyLevel,
      birthdate: birthdate,
      org_id: org_id,
      photos: photos,
      created_at: new Date(),
      adopted_at: null
    }

    this.pets.push(pet)

    return pet
  }
}
