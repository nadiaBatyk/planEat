import { Router } from 'express'
import mealRoutes from './meal.routes'
import ingredientRoutes from './ingredient.routes'
import featureRoutes from './feature.routes'
import MealTimeRoutes from './MealTime.routes'
import { plannerRoutes } from './planner.routes'
import { plannerEntryRoutes } from './plannerEntry.routes'

const appRouter = Router()

appRouter.use('/meals', mealRoutes)
appRouter.use('/ingredients', ingredientRoutes)
appRouter.use('/features', featureRoutes)
appRouter.use('/MealTimes', MealTimeRoutes)
appRouter.use('/planners', plannerRoutes)
appRouter.use('/plannerEntries', plannerEntryRoutes)

export default appRouter
