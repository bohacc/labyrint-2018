// import { Action, State } from '@ngrx/store';
import { INIT_CAPTCHA } from '../actions/captcha.actions';
import { AppState, initialState } from '../../../../state/app.state';
import { Actions } from '../../../../state/app.actions';

export function captchaReducer(state = initialState, action: any): any {
  console.log('captchaReducer');
  switch (action.type) {
    case INIT_CAPTCHA:
      console.log('REDUCER CAPTCHA');
      console.log(action.payload);
      console.log(state);
      return {captcha: true};
    default:
      return state;
  }
}
