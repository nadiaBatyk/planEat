import { filterCriteria } from '../../middlewares/filtering/filterCriteria'

export const orderByField = (model: string, urlField: string): string => {
  return filterCriteria[model].includes(urlField) ? urlField : 'id'
}

export const filterByField = (model: string, queryParams: any): {} => {
  let filters: any = {}
  const allowedFields = filterCriteria[model]
  for (const field in queryParams) {
    if (allowedFields.includes(field)) {
      filters[field] = queryParams[field]
    }
  }
  return filters
}
