import { Query } from '../common/types/query.types'
import { IngredientDao } from '../db/DAOs/classes/ingredient.dao'
import {
  IngredientDTORequest,
  IngredientDTOResponse,
} from '../db/DTOs/ingredient.dto'
import { IngredientMap } from '../db/mappers/ingredient.map'

export class IngredientService {
  ingredientDao: IngredientDao
  constructor() {
    this.ingredientDao = new IngredientDao()
  }
  getIngredients = async (query: Query): Promise<IngredientDTOResponse[]> => {
    const ingredients = await this.ingredientDao.getIngredients(query)
    return ingredients.map(m => IngredientMap.toDTO(m))
  }
  getIngredientById = async (id: number): Promise<IngredientDTOResponse> => {
    const ingredient = await this.ingredientDao.getIngredientById(id)
    return IngredientMap.toDTO(ingredient)
  }
  createIngredient = async (
    ingredient: IngredientDTORequest
  ): Promise<IngredientDTOResponse> => {
    const newIngredient = await this.ingredientDao.create(ingredient)
    return IngredientMap.toDTO(newIngredient)
  }
  updateIngredient = async (
    id: number,
    ingredient: IngredientDTORequest
  ): Promise<IngredientDTOResponse> => {
    const updatedIngredient = await this.ingredientDao.update(id, ingredient)
    return IngredientMap.toDTO(updatedIngredient)
  }
  deleteIngredient = async (id: number): Promise<string> => {
    const message = await this.ingredientDao.delete(id)
    return message
  }
}
