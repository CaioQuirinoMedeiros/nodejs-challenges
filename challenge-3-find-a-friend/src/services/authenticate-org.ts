import { InvalidCredentialsError } from '@/errors/InvalidCredentialsError'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import bcrypt from 'bcrypt'

interface AuthenticateServiceParams {
  email: string
  password: string
}

interface AuthenticateServiceReturn {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    params: AuthenticateServiceParams
  ): Promise<AuthenticateServiceReturn> {
    const { email, password } = params

    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, org.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
