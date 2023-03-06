import { Router } from 'express'
import { FeatureController } from '../controllers/feature.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { FeatureSchema } from '../middlewares/validation/schemas/feature.schema'
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
  .get(featureController.getFeatures)
  .post(validate(FeatureSchema), featureController.createFeature)

/**
 * @openapi
 *  /api/v1/features/{id}:
 *   get:
 *     tags:
 *       - Features
 *     summary: Find feature by Id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of feature to return
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
 *      - name: id
 *        in: path
 *        description: ID of feature to update
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
 *      - name: id
 *        in: path
 *        description: ID of feature to delete
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
  .route('/:id')
  .get(featureController.getFeatureById)
  .put(validate(FeatureSchema), featureController.updateFeature)
  .delete(featureController.deleteFeature)

export default featureRoutes
