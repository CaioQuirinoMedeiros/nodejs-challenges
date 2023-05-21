import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extractQueryParams.js'
import './database/database.js'
import AppError from './errors/AppError.js'

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const startTime = new Date().getTime()

  await json(request, response)

  const route = routes.find((eachRoute) => {
    const matchMethod = eachRoute.method === method
    const matchPath = eachRoute.path.test(url)
    return matchMethod && matchPath
  })

  try {
    if (route) {
      const urlMatches = url.match(route.path)

      const params = { ...urlMatches.groups }
      delete params['query']
      request.params = params

      const query = urlMatches.groups?.query
      const queryParams = extractQueryParams(query || '')
      request.queryParams = queryParams || {}

      await route.handler(request, response)
    } else {
      response.writeHead(404).end()
    }
  } catch (error) {
    const statusCode = error?.statusCode || 500
    console.log({ ...error, string: error.toString(), eae: error.message })
    const responseBody = {
      code: error?.code,
      message: error?.message
    }
    response.writeHead(statusCode).end(JSON.stringify(responseBody))
  } finally {
    const endTime = new Date().getTime()
    const duration = `${endTime - startTime}ms`
    console.log(`${method} ${url} - ${response.statusCode} - ${duration}`)
  }
})

server.listen(3333)
