export interface FilterConfig {
  [filterName: string]: string
}
export interface Criteria {
  [x: string]: FilterConfig
}
export const filterCriteria: Criteria = {
  meal: { id: 'number', name: 'string' },
  ingredient: { id: 'number', name: 'string', unit: 'string' },
  feature: { id: 'number', name: 'string' },
  mealFeature: {
    id: 'number',
    name: 'string',
    mealId: 'number',
    featureId: 'number',
    value: 'string',
  },
  mealIngredient: {
    id: 'number',
    name: 'string',
    mealId: 'number',
    ingredientId: 'number',
    unit: 'string',
    quantity: 'number',
  },
  mealTime: { id: 'number', name: 'string' },
  planner: {
    id: 'number',
    name: 'string',
    startDate: 'date',
    finishDate: 'date',
  },
  plannerEntry: {
    plannerId: 'number',
    mealId: 'number',
    mealTimeId: 'number',
    mealDate: 'date',
  },
}
