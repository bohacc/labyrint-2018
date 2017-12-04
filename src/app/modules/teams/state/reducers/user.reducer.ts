import * as UserActions from '../actions/user.actions';

export interface State {
  auth: any;
}

export const initialState: State = {
  auth: null
};

export function userReducer(state = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.AUTH_USER:
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
}
