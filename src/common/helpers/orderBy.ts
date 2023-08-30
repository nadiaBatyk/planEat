import { filterCriteria } from '../../middlewares/filtering/filterCriteria'
import { isValidDate } from './dates'

export const orderByField = (model: string, urlField: string): string => {
  return filterCriteria[model][urlField] ? urlField : 'id'
}

export const filterByField = (model: string, queryParams: any): {} => {
  let filters: any = {}
  const allowedFields = filterCriteria[model]
  for (const field in queryParams) {
    if (
      allowedFields[field] &&
      typeCheck(queryParams[field], allowedFields[field])
    ) {
      filters[field] = queryParams[field]
    }
  }

  return filters
}

const typeCheck = (field: string, type: string): boolean => {
  switch (type) {
    case 'number':
      return !isNaN(+field) || +field >= 0
    case 'date':
      return isValidDate(field)
    default:
      return true
  }
}
