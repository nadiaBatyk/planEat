import { NextFunction, Request, Response } from 'express'
import { FeatureService } from '../services/feature.service'
import { FeatureDTORequest } from '../db/DTOs/feature.dto'
import { Query } from '../common/types/query.types'

export class FeatureController {
  featureService: FeatureService
  constructor() {
    this.featureService = new FeatureService()
  }
  getFeatures = async (
    query: Query,
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const features = await this.featureService.getFeatures(query)
      res.status(200).json(features)
    } catch (error) {
      next(error)
    }
  }
  getFeatureById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { featureId } = req.params
      const feature = await this.featureService.getFeatureById(+featureId)
      res.status(200).json(feature)
    } catch (error) {
      next(error)
    }
  }

  createFeature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newFeature: FeatureDTORequest = req.body
      const feature = await this.featureService.createFeature(newFeature)
      res.status(200).json(feature)
    } catch (error) {
      next(error)
    }
  }
  updateFeature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { featureId } = req.params
      const newFeature: FeatureDTORequest = req.body
      const feature = await this.featureService.updateFeature(
        +featureId,
        newFeature
      )
      res.status(200).json(feature)
    } catch (error) {
      next(error)
    }
  }
  deleteFeature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { featureId } = req.params
      const message = await this.featureService.deleteFeature(+featureId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
