import * as FoodActions from '../actions/food.actions';
import { Food } from '../../models/foodDto';

export interface State {
  list: Food[];
}

export const initialState: State = {
  list: []
};

export function foodReducer(state = initialState, action: FoodActions.FoodActions) {
  switch (action.type) {
    case FoodActions.LOAD_FOOD:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
}
