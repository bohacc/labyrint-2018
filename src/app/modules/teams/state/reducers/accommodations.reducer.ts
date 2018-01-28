import * as AccommodationsActions from '../actions/accommodations.actions';
import { Accommodation } from '../../models/AccommodationDto';

export interface State {
  list: Accommodation[];
  listForEdit: Accommodation[];
}

export const initialState: State = {
  list: [],
  listForEdit: []
};

export function accommodationsReducer(state = initialState, action: AccommodationsActions.AccommodationsActions) {
  switch (action.type) {
    case AccommodationsActions.LOAD_ACCOMMODATIONS:
      return {
        ...state,
        list: [...action.payload]
      };
    case AccommodationsActions.LOAD_ACCOMMODATIONS_FOR_EDIT:
      return {
        ...state,
        listForEdit: [...action.payload]
      };
    default:
      return state;
  }
}
