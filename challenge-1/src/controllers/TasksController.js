import http from 'node:http'

import database from '../database/database.js'
import { Task } from '../models/Task.js'
import AppError from '../errors/AppError.js'

export class TasksController {
  fetch(request, response) {
    const queryParams = request.queryParams

    let tasks = Task.findAll()

    if (queryParams?.search) {
      tasks = tasks.filter((task) => {
        const matchTitle = task.title.includes(queryParams?.search)
        const matchDescription = task.description.includes(queryParams?.search)
        return matchTitle || matchDescription
      })
    }

    return response.end(JSON.stringify(tasks))
  }

  create(request, response) {
    const { title, description } = request.body

    if (!title || !description) {
      throw new AppError({ message: 'Title and description are required.' })
    }

    const task = Task.create({ title, description })
    task.save()
    return response.writeHead(201).end()
  }

  update(request, response) {
    const taskId = request.params?.taskId
    const { title, description } = request.body

    if (!title || !description) {
      throw new AppError({ message: 'Title and description are required.' })
    }

    const task = Task.findById(taskId)

    if (!task) {
      throw new AppError({ message: 'Task not found', status: 404 })
    }

    task.update({ title, description })
    task.save()

    return response.writeHead(204).end()
  }

  updateComplete(request, response) {
    const taskId = request.params?.taskId
 
    const task = Task.findById(taskId)

    if (!task) {
      throw new AppError({ message: 'Task not found', status: 404 })
    }

    task.complete()
    task.save()

    return response.writeHead(204).end()
  }

  delete(request, response) {
    const taskId = request.params?.taskId

    Task.deleteById(taskId)

    return response.writeHead(204).end()
  }
}
