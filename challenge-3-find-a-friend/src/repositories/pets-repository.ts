export type Pet = {
  id: string
  name: string
  about: string | null
  birthdate: Date
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  city: string
  photos: string[]
  created_at: Date
  adopted_at: Date | null
  org_id: string
}

export type PetWithOrg = Pet & {
  org: {
    id: string
    accountable: string
    email: string
    zip_code: string
    address: string
    whatsapp: string
    created_at: Date
  }
}

export type PetCreateInput = {
  id?: string
  name: string
  about: string
  birthdate: Date
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  city: string
  photos: string[]
  org_id: string
}

export type PetFindByIdInput = {
  petId: string
}

export type PetSearchInput = {
  city: string
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  independencyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  page: number
  pageSize?: number
}

export interface PetsRepository {
  findById(input: PetFindByIdInput): Promise<PetWithOrg | null>
  create(input: PetCreateInput): Promise<Pet>
  search(input: PetSearchInput): Promise<Pet[]>
}
