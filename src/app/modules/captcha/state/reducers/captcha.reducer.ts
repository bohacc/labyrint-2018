import * as CaptchaActions from '../actions/captcha.actions';

export interface State {
  status: boolean;
}

export const initialState: State = {
  status: false
};

export function captchaReducer(state = initialState, action: CaptchaActions.CaptchaActions) {
  switch (action.type) {
    case CaptchaActions.INIT_CAPTCHA:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
