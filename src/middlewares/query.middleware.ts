import { Request, Response, NextFunction } from 'express'
import { Query } from '../common/types/query.types'

export const queryHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let query: Query = {
    orderBy: (req.query?.orderBy as string) ?? 'id',
    direction:
      req.query?.direction?.toString().toLowerCase() === 'asc' ||
      req.query?.direction?.toString().toLowerCase() === 'desc'
        ? req.query?.direction?.toString().toLowerCase()
        : 'asc',
    page: req.query?.page && +req.query?.page > 0 ? +req.query.page : 1,
    pageSize:
      req.query?.pageSize && +req.query?.pageSize > 0 ? +req.query.pageSize : 5,
  }

  return next(query)
}
