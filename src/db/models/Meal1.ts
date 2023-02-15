import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from 'sequelize-typescript'
import { MealType1 } from './MealType1'
import { Ingredient1 } from './Ingredient1'
import { MealIngredient1 } from './MealIngredient1'

@Table({ timestamps: false })
export class Meal1 extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
    name!: string

  @ForeignKey(() => MealType1)
  @Column(DataTypes.INTEGER)
    mealTypeId!: number

  @BelongsTo(() => MealType1)
    mealType!: MealType1

  @BelongsToMany(() => Ingredient1, () => MealIngredient1)
    ingredients!: Ingredient1[]
}
