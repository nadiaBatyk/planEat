import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { Ingredient } from './Ingredient'

@Table({ timestamps: false })
export class MealIngredient extends Model {
  @ForeignKey(() => Meal)
  @Column
  mealId!: number

  @ForeignKey(() => Ingredient)
  @Column
  ingredientId!: number

  @AllowNull(false)
  @Column(DataTypes.FLOAT(4, 2))
  quantity!: number

  @BelongsTo(() => Meal)
  meal!: Meal

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient
}
