// import { Action, State } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { CREATE_TEAM, LOAD_TEAMS, REMOVE_TEAM, TeamsActions } from '../actions/teams.actions';
import { AppState, initialState } from '../../../../state/app.state';
import { Actions } from '../../../../state/app.actions';

export function teamsReducer(state = initialState, action: any): any {
  console.log('teamsReducer');
  switch (action.type) {
    case LOAD_TEAMS:
      console.log('REDUCER');
      console.log(action.payload);
      console.log(state);
      return [...action.payload];
    case REMOVE_TEAM:
      return state;
    case CREATE_TEAM:
      return [...state.teams, ...action.payload];
      // return {...state, teams: [...state.teams, action.payload]};
    default:
      return state;
  }
}
