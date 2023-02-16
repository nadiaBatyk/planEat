import { Router } from 'express'
import mealRoutes from './mealRoutes'
import ingredientRoutes from './ingredientRoutes'
import featureRoutes from './featureRoutes'
import mealTypeRoutes from './mealTypeRoutes'

const appRouter = Router()

appRouter.use('/meals', mealRoutes)
appRouter.use('/ingredients', ingredientRoutes)
appRouter.use('/features', featureRoutes)
appRouter.use('/mealTypes', mealTypeRoutes)

export default appRouter
