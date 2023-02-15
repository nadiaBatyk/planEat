import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, BelongsToMany } from 'sequelize-typescript'
import { Meal1 } from './Meal1'
import { MealIngredient1 } from './MealIngredient1'

@Table({ timestamps: false })
export class Ingredient1 extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
    name!: string

  @AllowNull(false)
  @Column(DataTypes.STRING(100))
    unit!: string

  @BelongsToMany(() => Meal1, () => MealIngredient1)
    meals!: Meal1[]
}
