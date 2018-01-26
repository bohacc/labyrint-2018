import { PersonDto } from './PersonDto';

export interface LoginTeamDto {
  name: string;
  email: string;
  phone: string;
  accommodation: string;
  payId: string;
  payAmount: number;
  payAccount: string;
  player1: PersonDto;
  player2: PersonDto;
  player3: PersonDto;
  player4: PersonDto;
  player5: PersonDto;
  accommodationPrice: number;
  tshirtsPrice: number;
}
