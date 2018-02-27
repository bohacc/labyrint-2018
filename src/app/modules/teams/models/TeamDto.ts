import { PersonDto } from '../../../shared/model/PersonDto';

export interface TeamDto {
  name: string;
  email: string;
  password?: string;
  password2?: string;
  phone: string;
  accommodation: string;
  payId: string;
  paySent: boolean;
  player1: PersonDto;
  player2: PersonDto;
  player3: PersonDto;
  player4: PersonDto;
  player5: PersonDto;
  registrationDate: number;
}
