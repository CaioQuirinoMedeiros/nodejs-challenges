import {
  Pet,
  PetCreateInput,
  PetFindByIdInput,
  PetSearchInput,
  PetWithOrg,
  PetsRepository
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async search(input: PetSearchInput): Promise<Pet[]> {
    const { city, page, energy, independencyLevel, pageSize = 20, size } = input

    const pets = await prisma.pet.findMany({
      where: {
        city: { equals: city, mode: 'insensitive' },
        energy: energy,
        size: size,
        independencyLevel: independencyLevel
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return pets
  }

  async findById(input: PetFindByIdInput): Promise<PetWithOrg | null> {
    const { petId } = input

    return prisma.pet.findUnique({
      where: { id: petId },
      include: { org: true }
    })
  }

  async create(input: PetCreateInput): Promise<Pet> {
    const {
      about,
      birthdate,
      city,
      energy,
      independencyLevel,
      name,
      photos,
      size,
      org_id
    } = input

    return prisma.pet.create({
      data: {
        birthdate: birthdate,
        city: city,
        energy: energy,
        independencyLevel: independencyLevel,
        name: name,
        size: size,
        about: about,
        org_id: org_id,
        photos: photos
      }
    })
  }
}
