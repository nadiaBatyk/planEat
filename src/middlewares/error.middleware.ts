import { Request, Response, NextFunction } from 'express'
import HttpException from '../common/error/HttpException'

export const errorHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || 500

  res.status(status).send({ ...error, message: error.message })
}
