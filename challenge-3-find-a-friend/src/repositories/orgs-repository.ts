export type OrgCreateData = {
  accountable: string
  email: string
  zip_code: string
  address: string
  whatsapp: string
  password_hash: string
}

export type Org = {
  id: string
  accountable: string
  email: string
  zip_code: string
  address: string
  whatsapp: string
  password_hash: string
  created_at: Date
}

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  create(data: OrgCreateData): Promise<Org>
}
