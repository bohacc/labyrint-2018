import { Action } from '@ngrx/store';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';

export const LOAD_CONFIG = '[LOAD_CONFIG] - load config';

export type ConfigActions = LoadConfigAction;

export class LoadConfigAction implements Action {
  readonly type = LOAD_CONFIG;
  constructor(public payload: ConfigDbDto) {}
}
