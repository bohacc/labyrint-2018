import * as ConfigActions from '../actions/config.actions';
import { ConfigDbDto } from '../../shared/model/ConfigDbDto';

export interface State {
  config: ConfigDbDto;
}

export const initialState: State = {
  config: {
    config: {
      building4: null,
      hut2: null,
      hut4: null,
      close_registration: null,
      open_registration: null,
      pay_account: null,
      registration_price: null
    }
  }
};

export function configReducer(state = initialState, action: ConfigActions.ConfigActions) {
  switch (action.type) {
    case ConfigActions.LOAD_CONFIG:
      return {
        ...state,
        config: {
          config: {...state.config.config, ...action.payload.config}
        }
      };
    default:
      return state;
  }
}
