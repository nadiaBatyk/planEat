import { Request, Response, NextFunction } from 'express'
import { Query } from '../../common/types/query.types'
import { filterCriteria } from './filterCriteria'

export const queryParamsHandler = (route: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
    console.log('SCHEMA QUE COMPARO', filterCriteria[route])
    console.log('OBJETO QUE RECIBO', req.query)
    console.log('OBJETO QUE ARMO', query)

    res.locals.queryParamsHandler = query
    return next()
  }
}
