export interface Criteria {
  [x: string]: Array<string>
}
export const filterCriteria: Criteria = {
  meal: ['id', 'name'],
  ingredient: ['id', 'name', 'unit'],
}
