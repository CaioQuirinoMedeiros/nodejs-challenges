import axios from 'axios'
import { CepProvider } from '../CepProvider'

export class ViaCepCepProvider implements CepProvider {
  async getCityByCep(cep: string): Promise<string> {
    const response = await axios.get<{ localidade: string }>(
      `https://viacep.com.br/ws/${cep}/json/`
    )


    return response.data?.localidade
  }
}
