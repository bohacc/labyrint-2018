import { ErrorDto } from '../../shared/model/ErrorDto';
import * as ErrorsActions from '../actions/errors.actions';

export interface State {
  errors: ErrorDto[];
}

export const initialState: State = {
  errors: []
};

export function errorsReducer(state = initialState, action: ErrorsActions.ErrorsActions) {
  switch (action.type) {
    case ErrorsActions.ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
