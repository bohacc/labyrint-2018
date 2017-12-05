import * as UserAuthActions from '../actions/userAuth.actions';

export interface State {
  access_token: string;
  expires_in: string;
  id_token: string;
  project_id: string;
  refresh_token: string;
  token_type: string;
  user_id: string;
}

export const initialState: State = {
  access_token: null,
  expires_in: null,
  id_token: null,
  project_id: null,
  refresh_token: null,
  token_type: null,
  user_id: null
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
