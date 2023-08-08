import { Request, Response, NextFunction } from 'express'
import { Query } from '../../common/types/query.types'

export const queryHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query: Query = {
    orderBy: (req.query?.orderBy as string) ?? 'id',
    direction:
      req.query?.direction?.toString().toLowerCase() === 'asc' ||
      req.query?.direction?.toString().toLowerCase() === 'desc'
        ? req.query?.direction?.toString().toLowerCase()
        : 'asc',
    pageNumber:
      req.query?.pageNumber && +req.query?.pageNumber > 0
        ? +req.query.pageNumber
        : 1,
    pageSize:
      req.query?.pageSize &&
      +req.query?.pageSize > 0 &&
      +req.query.pageSize < 50
        ? +req.query.pageSize
        : 5,
  }
  res.locals.queryParamsHandler = query
  return next()
}
