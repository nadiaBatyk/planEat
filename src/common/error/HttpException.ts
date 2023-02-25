export default class HttpException extends Error {
  statusCode: number
  name: string

  constructor(statusCode: number, message: string, name: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.name = name
  }
}
