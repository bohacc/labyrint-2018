import * as AccommodationsActions from '../actions/accommodations.actions';
import { Accommodation } from '../../models/AccommodationDto';

export interface State {
  list: Accommodation[];
}

export const initialState: State = {
  list: []
};

export function accommodationsReducer(state = initialState, action: AccommodationsActions.AccommodationsActions) {
  switch (action.type) {
    case AccommodationsActions.LOAD_ACCOMMODATIONS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
}
