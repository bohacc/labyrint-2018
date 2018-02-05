import { Action } from '@ngrx/store';
import { Accommodation } from '../../models/AccommodationDto';

export const LOAD_ACCOMMODATIONS = '[LOAD_ACCOMMODATIONS] - load accommodations';
export const LOAD_ACCOMMODATIONS_FOR_EDIT = '[LOAD_ACCOMMODATIONS_FOR_EDIT] - load accommodations for edit';
export const LOAD_ALL_ACCOMMODATIONS = '[LOAD_ALL_ACCOMMODATIONS] - load all accommodations';

export type AccommodationsActions =
  LoadAccommodationsAction |
  LoadAccommodationsForEditAction |
  LoadAllAccommodationsAction;

export class LoadAccommodationsAction implements Action {
  readonly type = LOAD_ACCOMMODATIONS;
  constructor(public payload: Accommodation[]) {}
}

export class LoadAccommodationsForEditAction implements Action {
  readonly type = LOAD_ACCOMMODATIONS_FOR_EDIT;
  constructor(public payload: Accommodation[]) {}
}

export class LoadAllAccommodationsAction implements Action {
  readonly type = LOAD_ALL_ACCOMMODATIONS;
  constructor(public payload: Accommodation[]) {}
}
