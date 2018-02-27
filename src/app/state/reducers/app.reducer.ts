import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { userAuthReducer } from './userAuth.reducer';
import { errorsReducer } from './errors.reducer';
import { loginTeamReducer } from './login-team.reducer';
import { messagesReducer } from './messages.reducer';
import { pendingReducer } from './pending.reducer';
import { configReducer } from './config.reducer';
import { registrationReducer } from './registration.reducer';

export const reducers: ActionReducerMap<AppState> = {
  userAuth: userAuthReducer,
  errors: errorsReducer,
  loginTeam: loginTeamReducer,
  messages: messagesReducer,
  pending: pendingReducer,
  config: configReducer,
  registration: registrationReducer
};
