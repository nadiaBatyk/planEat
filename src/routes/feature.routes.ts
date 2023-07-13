import { Router } from 'express'
import { FeatureController } from '../controllers/feature.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { featureSchema } from '../middlewares/validation/schemas/feature.schema'
import { queryHandler } from '../middlewares/query.middleware'
;('../controllers/feature.controller')

const featureRoutes = Router()
const featureController = new FeatureController()

/**
 * @openapi
 *  /api/v1/features:
 *   get:
 *     tags:
 *       - Features
 *     summary: Find all available features
 *     parameters:
 *      - $ref: "#/components/parameters/pageNumber"
 *      - $ref: "#/components/parameters/pageSize"
 *      - $ref: "#/components/parameters/orderBy"
 *      - $ref: "#/components/parameters/direction"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/FeatureDTOResponse"
 *   post:
 *     tags:
 *       - Features
 *     summary: Add a new feature
 *     requestBody:
 *       description: Create a new feature
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FeatureDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New feature successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FeatureDTOResponse"
 *       400:
 *         description: Invalid input
 */
featureRoutes
  .route('/')
  .get(queryHandler, featureController.getFeatures)
  .post(validate(featureSchema), featureController.createFeature)

/**
 * @openapi
 *  /api/v1/features/{featureId}:
 *   get:
 *     tags:
 *       - Features
 *     summary: Find feature by Id
 *     parameters:
 *      - $ref: "#/components/parameters/featureId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FeatureDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: feature not found
 *   put:
 *     tags:
 *       - Features
 *     summary: Updates an existing feature
 *     parameters:
 *      - $ref: "#/components/parameters/featureId"
 *     requestBody:
 *       description: Update a feature
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FeatureDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New feature successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FeatureDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Features
 *     summary: Deletes an existing feature
 *     parameters:
 *      - $ref: "#/components/parameters/featureId"
 *     responses:
 *       200:
 *         description: OK - New feature successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: feature not found
 */
featureRoutes
  .route('/:featureId')
  .get(featureController.getFeatureById)
  .put(validate(featureSchema), featureController.updateFeature)
  .delete(featureController.deleteFeature)

export default featureRoutes
