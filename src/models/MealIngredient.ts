import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'
import { Meal } from './Meal'
import { Ingredient } from './Ingredient'

export const MealIngredient = sequelize.define('MealIngredients', {
  MealId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'mealId',
    references: {
      model: Meal,
      key: 'id'
    }
  },
  IngredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ingredientId',
    references: {
      model: Ingredient,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, { timestamps: false })
