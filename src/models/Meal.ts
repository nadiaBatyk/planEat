import { sequelize } from '../db/db'
import { DataTypes } from 'sequelize'
import { MealTypes } from './MealTypes'

export const Meal = sequelize.define('Meal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mealTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MealTypes,
      key: 'id'

    }
  }
})
