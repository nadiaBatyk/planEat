export interface Criteria {
  [x: string]: Array<string>
}
export const filterCriteria: Criteria = {
  meal: ['id', 'name'],
  ingredient: ['id', 'name', 'unit'],
  feature: ['id', 'name'],
  mealFeature: ['mealId', 'featureId', 'value'],
  mealIngredient: ['id', 'name', 'unit', 'mealId', 'ingredientId', 'quantity'],
  mealTime: ['id', 'name'],
  planner: ['id', 'name', 'startDate', 'finishDate'],
  plannerEntry: ['id', 'plannerId', 'mealId', 'mealTimeId', 'mealDate'],
}
