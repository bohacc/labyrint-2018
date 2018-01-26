import { Action } from '@ngrx/store';
import { TShirt } from '../../models/TShirtDto';
import { TshirtDto } from '../../../../shared/model/TshirtDto';

export const LOAD_TSHIRTS = '[LOAD_TSHIRTS] - load tshirts';

export type TShirtsActions = LoadTShirtsAction;

export class LoadTShirtsAction implements Action {
  readonly type = LOAD_TSHIRTS;
  constructor(public payload: TshirtDto[]) {}
}
