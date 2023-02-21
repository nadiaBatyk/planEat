import { Model, ModelCtor } from 'sequelize-typescript'
import HttpException from '../../common/error/HttpException'

export abstract class BaseRepository<M extends Model> {
  model: ModelCtor<M>
  constructor(model: ModelCtor<M>) {
    this.model = model
  }
  async delete(m: Model<M>) {
    try {
      return await this.model.destroy({
        where: { id: m.id.toString() },
      })
    } catch (error) {
      const err = new HttpException(500, error as string)
      throw err
    }
  }

  async create(m: M) {
    try {
      return await this.model.create()
    } catch (error) {
      const err = new HttpException(500, error as string)
      throw err
    }
  }
}
