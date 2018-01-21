import { Action } from '@ngrx/store';

export const PENDING = '[PENDING] - pending';

export type PendingActions = PendingAction;

export class PendingAction implements Action {
  readonly type = PENDING;
  constructor(public payload: boolean) {}
}
