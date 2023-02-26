export interface BaseDao<T> {
  delete(id: number): Promise<string>
  create(t: T): Promise<T>
}
