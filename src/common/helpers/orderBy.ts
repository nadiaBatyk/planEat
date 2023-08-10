import { filterCriteria } from '../../middlewares/filtering/filterCriteria'

export const orderByField = (model: string, urlField: string): string => {
  return filterCriteria[model].includes(urlField) ? urlField : 'id'
}
