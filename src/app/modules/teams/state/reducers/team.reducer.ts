import { TeamDto } from '../../models/TeamDto';
import * as TeamsActions from '../actions/teams.actions';
import { ErrorDto } from '../../../../shared/model/ErrorDto';

export interface State {
  list: TeamDto[];
  registration: {
    name: string
  };
  errors: ErrorDto[];
  registrationFormSuccess: boolean;
}

export const initialState: State = {
  list: [],
  registration: {
    name: null
  },
  errors: [],
  registrationFormSuccess: null
};

export function teamsReducer(state = initialState, action: TeamsActions.TeamsActions) {
  switch (action.type) {
    case TeamsActions.LOAD_TEAMS:
      return {
        ...state,
        list: [...action.payload]
      };
    case TeamsActions.REMOVE_TEAM:
      return {
        ...state,
        list: state.list.filter((team) => team.name !== action.payload.name )
      };
    case TeamsActions.CREATE_TEAM:
      return state;
    case TeamsActions.UPDATE_TEAM:
      return {
        ...state,
        list: [...state.list.filter((team) => team.name !== action.payload.name), action.payload]
      };
    case TeamsActions.REGISTER_EXISTS_TEAM:
      return {
        ...state,
        errors: [action.payload]
      };
    case TeamsActions.REGISTRATION_FORM_SUCCESS_TEAM:
      return {
        ...state,
        registrationFormSuccess: action.payload
      };
    default:
      return state;
  }
}
