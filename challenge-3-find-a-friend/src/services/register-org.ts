import { AppError } from '@/errors/AppError'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import bcrypt from 'bcrypt'

interface RegisterOrgServiceParams {
  accountable: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}

interface RegisterOrgServiceReturn {
  org: Org
}

export class RegisterOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    params: RegisterOrgServiceParams
  ): Promise<RegisterOrgServiceReturn> {
    const { email, accountable, address, password, whatsapp, zipCode } = params

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new AppError({ statusCode: 409, message: 'Email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 6)

    const org = await this.orgsRepository.create({
      accountable: accountable,
      email: email,
      zip_code: zipCode,
      address: address,
      whatsapp: whatsapp,
      password_hash: passwordHash
    })

    return { org }
  }
}
