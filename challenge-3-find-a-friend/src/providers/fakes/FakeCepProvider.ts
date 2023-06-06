import { CepProvider } from '../CepProvider'

export class FakeCepProvider implements CepProvider {
  async getCityByCep(_cep: string): Promise<string> {
    return 'city'
  }
}
