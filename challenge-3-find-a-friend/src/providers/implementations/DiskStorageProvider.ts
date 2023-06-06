import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import slugify from "slugify"
import { StorageProvider } from '../StorageProvider'
import { uploadConfig } from '@/config/uploadConfig'

class DiskStorageProvider implements StorageProvider {
  public async saveFile(filename: string, buffer: Buffer): Promise<string> {
    
    await fs.promises.writeFile(
      path.resolve(uploadConfig.uploadsFolder, filename),
      buffer
    )

    return filename
  }
}

export default DiskStorageProvider
