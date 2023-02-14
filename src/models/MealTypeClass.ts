import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize'
import { Meal } from './MealClass'
import { sequelize } from '../db/db'

export class MealType extends Model<InferAttributes<MealType>, InferCreationAttributes<MealType>> {
  declare id: CreationOptional<number>
  declare name: string
  declare meals?: NonAttribute<Meal[]>

  declare public static associations: {
    meals: Association<MealType, Meal>
  }
}

MealType.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  }
},
{ sequelize, timestamps: false })
