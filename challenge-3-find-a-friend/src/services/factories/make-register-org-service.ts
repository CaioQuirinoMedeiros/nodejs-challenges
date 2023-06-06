import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgService } from '../register-org'

export function makeRegisterOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  return new RegisterOrgService(orgsRepository)
}
