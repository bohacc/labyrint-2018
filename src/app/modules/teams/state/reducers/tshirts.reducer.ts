import * as TShirtsActions from '../actions/tshirts.action';
import { TShirt } from '../../models/TShirt';

export interface State {
  list: TShirt[];
}

export const initialState: State = {
  list: []
};

export function tshirtsReducer(state = initialState, action: TShirtsActions.TShirtsActions) {
  switch (action.type) {
    case TShirtsActions.LOAD_TSHIRTS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
}
