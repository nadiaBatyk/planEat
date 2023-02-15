import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import { Meal1 } from './Meal1'

@Table({ timestamps: false })
export class MealType1 extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
    name!: string

  @HasMany(() => Meal1)
    meals!: Meal1[]
}
