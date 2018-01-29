import * as RegistrationActions from '../actions/registration.actions';

export interface State {
  end: boolean;
}

export const initialState: State = {
  end: false
};

export function registrationReducer(state = initialState, action: RegistrationActions.RegistrationActions) {
  switch (action.type) {
    case RegistrationActions.SET_END_REGISTRATION:
      return {
        ...state,
        end: action.payload
      };
    default:
      return state;
  }
}
