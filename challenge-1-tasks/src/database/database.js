import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dbPath = path.resolve(path.dirname(filename), 'db.json')

class Database {
  #database = {}

  constructor() {
    fs.readFile(dbPath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch((err) => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database, undefined, 2))
  }

  select(table) {
    const data = this.#database[table] || []
    return data
  }

  selectById(table, id) {
    const data = this.#database[table] || []
    return data.find((item) => item.id === id)
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    if (!Array.isArray(this.#database[table])) return

    const index = this.#database[table].findIndex((item) => {
      return item.id === id
    })

    if (index !== -1) {
      this.#database[table].splice(index, 1)
    }

    this.#persist()
  }

  update(table, id, data) {
    if (!Array.isArray(this.#database[table])) return

    const index = this.#database[table].findIndex((item) => {
      return item.id === id
    })

    if (index !== -1) {
      this.#database[table][index] = {
        ...this.#database[table][index],
        ...data
      }
    }

    this.#persist()
  }
}

export default new Database()
