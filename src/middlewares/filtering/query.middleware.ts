import { Request, Response, NextFunction } from 'express'
import { Query } from '../../common/types/query.types'
import { filterCriteria } from './filterCriteria'
import { orderByField } from '../../common/helpers/orderBy'

export const queryParamsHandler = (model: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let query: Query = {
      orderBy: orderByField(model, req.query.orderBy as string),
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
    console.log('SCHEMA QUE COMPARO', filterCriteria[model])
    console.log('OBJETO QUE RECIBO', req.query)
    console.log('OBJETO QUE ARMO', query)

    res.locals.queryParamsHandler = query
    return next()
  }
}
