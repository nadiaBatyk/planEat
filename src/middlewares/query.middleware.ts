import { Request, Response, NextFunction } from 'express'
import { Query } from '../common/types/query.types'

export const queryHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let query: Query = {
    orderBy: (req.query?.orderBy as string) ?? 'id',
    direction:
      req.query?.direction === 'ASC' || req.query?.direction === 'DESC'
        ? req.query?.direction
        : 'ASC',
    page: req.query?.page && +req.query?.page > 0 ? +req.query.page : 1,
    pageSize:
      req.query?.pageSize && +req.query?.pageSize > 0 ? +req.query.pageSize : 5,
  }
}
