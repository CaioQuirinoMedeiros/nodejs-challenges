import { prisma } from '@/lib/prisma'
import { OrgCreateData, OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(orgId: string) {
    return prisma.org.findUnique({ where: { id: orgId } })
  }

  async findByEmail(email: string) {
    return prisma.org.findUnique({ where: { email: email } })
  }

  async create(data: OrgCreateData) {
    return prisma.org.create({ data: data })
  }
}
