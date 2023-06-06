export interface CepProvider {
  getCityByCep(cep: string): Promise<string>
}
