import { Router } from 'express'
import mealRoutes from './meal.routes'
import ingredientRoutes from './ingredient.routes'
import featureRoutes from './feature.routes'
import mealTypeRoutes from './mealType.routes'
import { plannerRoutes } from './planner.routes'

const appRouter = Router()

appRouter.use('/meals', mealRoutes)
appRouter.use('/ingredients', ingredientRoutes)
appRouter.use('/features', featureRoutes)
appRouter.use('/mealTypes', mealTypeRoutes)
appRouter.use('/planners', plannerRoutes)

export default appRouter
