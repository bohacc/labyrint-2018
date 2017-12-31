import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { userAuthReducer } from './userAuth.reducer';
import { errorsReducer } from './errors.reducer';

export const reducers: ActionReducerMap<AppState> = {
  userAuth: userAuthReducer,
  errors: errorsReducer
};
