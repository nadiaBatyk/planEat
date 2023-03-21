import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript'
import { Ingredient } from './Ingredient'
import { MealIngredient } from './MealIngredient'
import { Feature } from './Feature'
import { MealFeature } from './MealFeature'
import { PlannerEntry } from './PlannerEntry'

@Table({ timestamps: false })
export class Meal extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @BelongsToMany(() => Ingredient, () => MealIngredient)
  ingredients!: Ingredient[]

  @BelongsToMany(() => Feature, () => MealFeature)
  features!: Feature[]

  @HasMany(() => PlannerEntry)
  plannerEntries!: PlannerEntry[]
}
