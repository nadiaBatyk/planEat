import { Router } from 'express'
import { FeatureController } from '../controllers/feature.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { FeatureSchema } from '../middlewares/validation/schemas/feature.schema'
;('../controllers/feature.controller')

const featureRoutes = Router()
const featureController = new FeatureController()
featureRoutes
  .route('/')
  .get(featureController.getFeatures)
  .post(validate(FeatureSchema), featureController.createFeature)

featureRoutes
  .route('/:id')
  .get(featureController.getFeatureById)
  .put(validate(FeatureSchema), featureController.updateFeature)
  .delete(featureController.deleteFeature)

export default featureRoutes
