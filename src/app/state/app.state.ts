import * as UserAuthReducer from './reducers/userAuth.reducer';
import * as ErrorsReducer from './reducers/errors.reducer';

export interface AppState {
  userAuth: UserAuthReducer.State;
  errors: ErrorsReducer.State;
}
