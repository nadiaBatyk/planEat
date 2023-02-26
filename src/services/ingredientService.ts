import { IngredientDao } from '../db/DAOs/classes/ingredient.dao'
import { IngredientDTO } from '../db/DTOs/ingredient.dto'
import { IngredientMap } from '../db/mappers/ingredient.map'

export class IngredientService {
  ingredientDao: IngredientDao
  constructor() {
    this.ingredientDao = new IngredientDao()
  }
  getIngredients = async (): Promise<IngredientDTO[]> => {
    const ingredients = await this.ingredientDao.getIngredients()
    return ingredients.map(m => IngredientMap.toDTO(m))
  }
  getIngredientById = async (id: number): Promise<IngredientDTO> => {
    const ingredient = await this.ingredientDao.getIngredientById(id)
    return IngredientMap.toDTO(ingredient)
  }
  createIngredient = async (
    ingredient: IngredientDTO
  ): Promise<IngredientDTO> => {
    const newIngredient = await this.ingredientDao.create(ingredient)
    return IngredientMap.toDTO(newIngredient)
  }
  updateIngredient = async (
    id: number,
    ingredient: IngredientDTO
  ): Promise<IngredientDTO> => {
    const updatedIngredient = await this.ingredientDao.update(id, ingredient)
    return IngredientMap.toDTO(updatedIngredient)
  }
  deleteIngredient = async (id: number): Promise<string> => {
    const message = await this.ingredientDao.delete(id)
    return message
  }
}
