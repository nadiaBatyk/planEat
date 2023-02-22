export interface BaseDao<T>{
    exists(t:T):Promise<boolean>;
    delete(id:number):Promise<string>;
    create(t:T):Promise<T>
}