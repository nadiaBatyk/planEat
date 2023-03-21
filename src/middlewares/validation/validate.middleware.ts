import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
export const validate = <T extends z.ZodTypeAny>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      return next()
    } catch (error) {
      let err = error
      if (err instanceof z.ZodError) {
        err = err.issues.map(e => ({ path: e.path[0], message: e.message }))
      }
      return res.status(400).json({
        status: 'Failed Request',
        error: err,
      })
    }
  }
}
