import { sequelize } from '../db'
import { DataTypes } from 'sequelize'
import { MealType } from './MealType'
import { Feature } from './Feature'
import { MealFeature } from './MealFeature'
import { Ingredient } from './Ingredient'
import { MealIngredient } from './MealIngredient'
// import { MealFeature } from './MealFeature'

export const Meal = sequelize.define(
  'Meal',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  { timestamps: false }
)

MealType.hasMany(Meal, {
  foreignKey: 'mealTypeId'
})
Meal.belongsTo(MealType, { foreignKey: 'mealTypeId' })

Meal.belongsToMany(Feature, { through: MealFeature })
Feature.belongsToMany(Meal, { through: MealFeature })
Meal.belongsToMany(Ingredient, { through: MealIngredient })
Ingredient.belongsToMany(Meal, { through: MealIngredient })
