import * as ConfigActions from '../actions/config.actions';
import { ConfigDbDto } from '../../models/ConfigDbDto';

export interface State {
  config: ConfigDbDto;
}

export const initialState: State = {
  config: {
    accommodation: {
      building4: null,
      hut2: null,
      hut4: null,
      close_registration: null,
      open_registration: null
    }
  }
};

export function configReducer(state = initialState, action: ConfigActions.ConfigActions) {
  switch (action.type) {
    case ConfigActions.LOAD_CONFIG:
      return {
        ...state,
        config: {...state.config, ...action.payload}
      };
    default:
      return state;
  }
}
