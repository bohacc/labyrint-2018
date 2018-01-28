import { Action } from '@ngrx/store';
import { Accommodation } from '../../models/AccommodationDto';

export const LOAD_ACCOMMODATIONS = '[LOAD_ACCOMMODATIONS] - load accommodations';
export const LOAD_ACCOMMODATIONS_FOR_EDIT = '[LOAD_ACCOMMODATIONS_FOR_EDIT] - load accommodations for edit';

export type AccommodationsActions =
  LoadAccommodationsAction |
  LoadAccommodationsForEditAction;

export class LoadAccommodationsAction implements Action {
  readonly type = LOAD_ACCOMMODATIONS;
  constructor(public payload: Accommodation[]) {}
}

export class LoadAccommodationsForEditAction implements Action {
  readonly type = LOAD_ACCOMMODATIONS_FOR_EDIT;
  constructor(public payload: Accommodation[]) {}
}
