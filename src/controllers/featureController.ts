import { Request, Response } from 'express'
import { Meal } from '../db/models/Meal'
import { Feature } from '../db/models/Feature'

const getFeatures = async (_req: Request, res: Response): Promise<void> => {
  const f = await Feature.findAll({ include: [Meal] })
  res.send(f)
}
const createFeature = async (_req: Request, res: Response): Promise<void> => {
  const { name } = _req.body
  const m = await Feature.create({ name })
  console.log(m)
  res.send(m.dataValues)
}

export default {
    getFeatures,
    createFeature,
}
