import { randomUUID } from 'node:crypto'
import { Org, OrgCreateData, OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async findById(orgId: string) {
    const org = this.orgs.find((user) => {
      return user.id === orgId
    })

    return org || null
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((eachOrg) => {
      return eachOrg.email === email
    })

    return org || null
  }

  async create(data: OrgCreateData): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      accountable: data.accountable,
      email: data.email,
      zip_code: data.zip_code,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.orgs.push(org)
    return org
  }
}
