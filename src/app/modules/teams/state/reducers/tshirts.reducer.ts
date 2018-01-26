import * as TShirtsActions from '../actions/tshirts.action';
import { TshirtDto } from '../../../../shared/model/TshirtDto';

export interface State {
  list: TshirtDto[];
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
