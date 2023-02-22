export interface BaseDao<T>{
    exists(t:T):Promise<boolean>;
    delete(t:T):Promise<void>;
    create(t:T):Promise<T>
}