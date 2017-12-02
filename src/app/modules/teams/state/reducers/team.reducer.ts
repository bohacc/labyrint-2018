import { TeamDto } from '../../models/TeamDto';
import * as TeamsActions from '../actions/teams.actions';

export interface State {
  list: TeamDto[];
  registration: {
    name: string
  };
}

export const initialState: State = {
  list: [],
  registration: {
    name: null
  }
};

export function teamsReducer(state = initialState, action: TeamsActions.TeamsActions) {
  switch (action.type) {
    case TeamsActions.LOAD_TEAMS:
      return {
        ...state,
        list: [...action.payload]
      };
    case TeamsActions.REMOVE_TEAM:
      return state;
    case TeamsActions.CREATE_TEAM:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }
}
