import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Meal } from './Meal';
import { Ingredient } from './Ingredient';

@Table({ timestamps: false })
export class MealIngredient extends Model {
  @ForeignKey(() => Meal)
  @Column
  mealId!: number;

  @ForeignKey(() => Ingredient)
  @Column
  ingredientId!: number;

  @AllowNull(false)
  @Column(DataTypes.FLOAT(4, 2))
  quantity!: number;
}
