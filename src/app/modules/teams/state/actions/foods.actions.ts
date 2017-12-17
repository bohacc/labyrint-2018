import { Action } from '@ngrx/store';
import { Food } from '../../models/FoodDto';

export const LOAD_FOODS = '[LOAD_FOODS] - load foods';

export type FoodsActions = LoadFoodsAction;

export class LoadFoodsAction implements Action {
  readonly type = LOAD_FOODS;
  constructor(public payload: Food[]) {}
}
