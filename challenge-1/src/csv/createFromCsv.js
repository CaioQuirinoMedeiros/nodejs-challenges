import { parse } from 'csv-parse'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const csvPath = path.resolve(path.dirname(filename), 'data.csv')

const parser = fs
  .createReadStream(csvPath)
  .pipe(parse({ delimiter: ',', from_line: 2 }))

for await (const record of parser) {
  const [title, description] = record
  fetch('http://localhost:3333/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
    headers: { 'content-type': 'application/json' }
  })
}
