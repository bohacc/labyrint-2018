import { State } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { LOAD_TEAMS, REMOVE_TEAM } from '../actions/teams.actions';
import { AppState, initialState } from '../../../../state/app.state';
import { Actions } from '../../../../state/app.actions';

export function teamsReducer(state = initialState, action: Actions): AppState {
  switch (action.type) {
    case LOAD_TEAMS:
      return {...state, teams: action.payload};
    case REMOVE_TEAM:
      return {...state, teams: state.teams.filter(team => team.id !== action.payload.id)};
    default:
      return state;
  }
}
