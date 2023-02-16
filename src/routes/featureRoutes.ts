import { Router } from 'express'
import featureController from '../controllers/featureController'

const featureRoutes = Router()
featureRoutes
  .route('/')
  .get(featureController.getFeatures)
  .post(featureController.createFeature)

featureRoutes
  .route('/:id')
  .get(featureController.getFeature)
  .put(featureController.updateFeature)
  .delete(featureController.deleteFeature)

export default featureRoutes
