import { AccommodationEnum } from './AccommodationEnum';

export interface Accommodation {
  value: string;
  name: string;
  type: AccommodationEnum;
  count: number;
  price: number;
}
