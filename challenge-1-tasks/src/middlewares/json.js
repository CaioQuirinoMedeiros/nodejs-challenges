export async function json(request, response) {
  let bodyString = ''

  await new Promise((resolve) => {
    request
      .on('data', (chunk) => {
        bodyString += chunk.toString()
      })
      .on('end', () => {
        resolve()
      })
  })

  try {
    request.body = JSON.parse(bodyString)
  } catch {
    request.body = null
  }

  response.setHeader('content-type', 'application/json')
}
