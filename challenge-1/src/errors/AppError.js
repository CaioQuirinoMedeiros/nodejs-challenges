class AppError {
  message
  code
  statusCode

  constructor(params) {
    const { message = 'Unknown error', statusCode = 400, code } = params || {}

    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
