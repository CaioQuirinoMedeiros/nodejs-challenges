export interface StorageProvider {
  saveFile(filename: string, buffer: Buffer): Promise<string>
}
