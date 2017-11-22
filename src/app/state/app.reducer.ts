import { combineReducers } from '@ngrx/store';
import { teamsReducer } from '../modules/teams/state/reducers/team.reducer';

const reducers = {
  team: teamsReducer,
};

export function AppReducer(state: any, action: any) {
  return combineReducers(reducers);
}
