import http from 'node:http'
import { json } from './middlewares/json.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath.js'
import { TasksController } from './controllers/TasksController.js'
import database from './database/database.js'

const tasksController = new TasksController()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: tasksController.fetch
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: tasksController.create
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:taskId'),
    handler: tasksController.delete
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:taskId'),
    handler: tasksController.update
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:taskId/complete'),
    handler: tasksController.updateComplete
  }
]
