import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
export const validate = (schema: z.AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
