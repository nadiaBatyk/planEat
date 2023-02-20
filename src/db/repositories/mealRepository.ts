
import { Meal } from "../models/Meal";
import { BaseRepository } from "./baseRepository";

export class MealRepository extends BaseRepository<Meal>{
    constructor(){
        super(Meal)
    }


}