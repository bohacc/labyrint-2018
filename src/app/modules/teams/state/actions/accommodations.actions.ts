import { Action } from '@ngrx/store';
import { Accommodation } from '../../models/AccommodationDto';

export const LOAD_ACCOMMODATIONS = '[LOAD_ACCOMMODATIONS] - load food';

export type AccommodationsActions = LoadAccommodationsAction;

export class LoadAccommodationsAction implements Action {
  readonly type = LOAD_ACCOMMODATIONS;
  constructor(public payload: Accommodation[]) {}
}
