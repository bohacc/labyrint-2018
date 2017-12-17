import * as FoodsActions from '../actions/foods.actions';
import { Food } from '../../models/FoodDto';

export interface State {
  list: Food[];
}

export const initialState: State = {
  list: []
};

export function foodsReducer(state = initialState, action: FoodsActions.FoodsActions) {
  switch (action.type) {
    case FoodsActions.LOAD_FOODS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
}
