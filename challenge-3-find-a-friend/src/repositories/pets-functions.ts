import { env } from '@/env'
import { Pet, PetWithOrg } from './pets-repository'

export function transformListPets(pet: Pet) {
  return {
    id: pet.id,
    name: pet.name,
    photosUrls: pet.photos.map((photo) => `${env.HOST_URL}/pet/photos/${photo}`)
  }
}

export function transformPetDetails(petWithOrg: PetWithOrg) {
  return {
    ...petWithOrg,
    photosUrls: petWithOrg.photos.map(
      (photo) => `${env.HOST_URL}/pet/photos/${photo}`
    ),
    org_id: undefined,
    org: { ...petWithOrg.org, password_hash: undefined }
  }
}
