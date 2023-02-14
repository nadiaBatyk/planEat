import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize'
import { Meal } from './MealClass'
import { sequelize } from '../db/db'

export class Feature extends Model<InferAttributes<Feature>, InferCreationAttributes<Feature>> {
  declare id: CreationOptional<number>
  declare name: string
  declare meals?: NonAttribute<Meal[]>

  declare public static associations: {
    meals: Association<Feature, Meal>
  }
}

Feature.init({
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
