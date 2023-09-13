import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
import { UserDTORequest } from '../../DTOs/user.dto'
import { User } from '../../models/User'
import { IUserDao } from '../interfaces/userDao.interface'

export class UserDao implements IUserDao {
  getUserById = async (id: number): Promise<User> => {
    try {
      const user = await User.findByPk(id)
      if (user) {
        return user
      }
      throw new HttpException(
        404,
        `User with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getUsers = async (query: Query): Promise<User[]> => {
    try {
      const users = await User.findAll({
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
        where: query.filter,
      })

      return users
    } catch (error) {
      throw error
    }
  }
  delete = async (id: number): Promise<string> => {
    try {
      await this.getUserById(id)
      await User.destroy({
        where: { id: id },
      })
      return `User #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (t: UserDTORequest): Promise<User> => {
    throw new Error('Method not implemented.')
  }
  update = async (id: number, newUser: UserDTORequest): Promise<User> => {
    throw new Error('Method not implemented.')
  }
}
