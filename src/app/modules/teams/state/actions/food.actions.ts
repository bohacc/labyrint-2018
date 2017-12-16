import { Action } from '@ngrx/store';
import { Food } from '../../models/foodDto';

export const LOAD_FOOD = '[LOAD_FOOD] - load food';

export type FoodActions = LoadFoodAction;

export class LoadFoodAction implements Action {
  readonly type = LOAD_FOOD;
  constructor(public payload: Food[]) {}
}
