import { NextFunction, Request, Response } from 'express'
import { FeatureService } from '../services/feature.service'
import { FeatureDTORequest } from '../db/DTOs/feature.dto'

export class FeatureController {
  featureService: FeatureService
  constructor() {
    this.featureService = new FeatureService()
  }
  getFeatures = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const features = await this.featureService.getFeatures()
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
      const { id } = req.params
      const feature = await this.featureService.getFeatureById(+id)
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
      const { id } = req.params
      const newFeature: FeatureDTORequest = req.body
      const feature = await this.featureService.updateFeature(+id, newFeature)
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
      const { id } = req.params
      const message = await this.featureService.deleteFeature(+id)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
