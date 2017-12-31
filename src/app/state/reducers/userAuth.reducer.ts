import * as UserAuthActions from '../actions/userAuth.actions';

export interface State {
  email: string;
  uid: string;
  isLoged: boolean;
  url: string;
}

export const initialState: State = {
  email: null,
  uid: null,
  isLoged: false,
  url: null
};

export function userAuthReducer(state = initialState, action: UserAuthActions.UserAuthActions) {
  switch (action.type) {
    case UserAuthActions.AUTH_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
