import * as PendingActions from '../actions/pending.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false
};

export function pendingReducer(state = initialState, action: PendingActions.PendingActions) {
  switch (action.type) {
    case PendingActions.PENDING:
      return {
        ...state,
        pending: action.payload
      };
    default:
      return state;
  }
}
