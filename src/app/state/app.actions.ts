import { TeamsActions } from '../modules/teams/state/actions/teams.actions';
import { CaptchaActions } from '../modules/captcha/state/actions/captcha.actions';

// export type Actions = LoadTeams | RemoveTeam;
export type Actions = TeamsActions | CaptchaActions;

