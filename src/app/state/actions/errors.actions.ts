import { Action } from '@ngrx/store';
import { ErrorDto } from '../../shared/model/ErrorDto';

export const ERROR = '[ERROR] - error';

export type ErrorsActions = ErrorAction;

export class ErrorAction implements Action {
  readonly type = ERROR;
  constructor(public payload: ErrorDto[]) {}
}
