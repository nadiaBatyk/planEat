import { Router } from 'express'
import mealRoutes from './meal.routes'
import ingredientRoutes from './ingredient.routes'
import featureRoutes from './feature.routes'
import mealTypeRoutes from './mealType.routes'

const appRouter = Router()

appRouter.use('/meals', mealRoutes)
appRouter.use('/ingredients', ingredientRoutes)
appRouter.use('/features', featureRoutes)
appRouter.use('/mealTypes', mealTypeRoutes)

export default appRouter
