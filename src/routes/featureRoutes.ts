import { Router } from 'express'
import featureController from '../controllers/featureController'

const featureRoutes = Router()
featureRoutes
  .route('/features')
  .get(featureController.getFeatures)
  .post(featureController.createFeature)

/* featureRoutes
  .route('/features/:id')
  .get(featureController.getFeature)
  .put(featureController.editFeature)
  .delete(featureController.deleteFeature) */

export default featureRoutes
