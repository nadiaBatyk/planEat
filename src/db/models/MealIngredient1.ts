import { DataTypes } from 'sequelize'
import { Table, Column, Model, ForeignKey, AllowNull } from 'sequelize-typescript'
import { Meal1 } from './Meal1'
import { Ingredient1 } from './Ingredient1'

@Table({ timestamps: false })
export class MealIngredient1 extends Model {
  @ForeignKey(() => Meal1)
  @Column
    mealId!: number

  @ForeignKey(() => Ingredient1)
  @Column
    ingredientId!: number

  @AllowNull(false)
  @Column(DataTypes.FLOAT(4, 2))
    quantity!: number
}
