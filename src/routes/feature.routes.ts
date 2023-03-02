import { Router } from 'express'
import { FeatureController } from '../controllers/feature.controller'
;('../controllers/feature.controller')

const featureRoutes = Router()
const featureController = new FeatureController()
featureRoutes
  .route('/')
  .get(featureController.getFeatures)
  .post(featureController.createFeature)

featureRoutes
  .route('/:id')
  .get(featureController.getFeatureById)
  .put(featureController.updateFeature)
  .delete(featureController.deleteFeature)

export default featureRoutes
