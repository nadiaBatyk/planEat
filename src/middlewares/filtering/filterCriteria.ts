export interface Criteria {
  [x: string]: Array<string>
}
export const filterCriteria: Criteria = {
  meals: ['id', 'name'],
  ingredients: ['id', 'name', 'unit'],
}
