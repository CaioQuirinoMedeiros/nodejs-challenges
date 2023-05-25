import { randomUUID } from 'node:crypto'
import database from '../database/database.js'

export class Task {
  constructor({
    id,
    title,
    description,
    created_at,
    updated_at,
    completed_at
  }) {
    this.id = id
    this.title = title
    this.description = description
    this.created_at = created_at
    this.updated_at = updated_at
    this.completed_at = completed_at
  }

  static create({ title, description }) {
    const now = new Date()

    return new Task({
      id: randomUUID(),
      title,
      description,
      created_at: now,
      updated_at: now,
      completed_at: null
    })
  }

  static findAll() {
    const tasks = database.select('tasks')
    return tasks.map((task) => new Task(task))
  }

  static findById(id) {
    const task = database.selectById('tasks', id)
    if (task) {
      return new Task(task)
    } else {
      return undefined
    }
  }

  static deleteById(id) {
    database.delete('tasks', id)
  }

  save() {
    const task = database.selectById('tasks', this.id)
    if (task) {
      database.update('tasks', this.id, this)
    } else {
      database.insert('tasks', this)
    }
  }

  update({ title, description }) {
    this.title = title
    this.description = description
    this.updated_at = new Date()
  }

  complete() {
    this.completed_at = new Date()
  }
}
