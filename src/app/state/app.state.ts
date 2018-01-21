import * as UserAuthReducer from './reducers/userAuth.reducer';
import * as ErrorsReducer from './reducers/errors.reducer';
import * as LoginTeamReducer from './reducers/login-team.reducer';
import * as MessagesReducer from './reducers/messages.reducer';
import * as PendingReducer from './reducers/pending.reducer';

export interface AppState {
  userAuth: UserAuthReducer.State;
  errors: ErrorsReducer.State;
  loginTeam: LoginTeamReducer.State;
  messages: MessagesReducer.State;
  pending: PendingReducer.State;
}
