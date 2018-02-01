import { Component } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  teamsCount: number;
  teamsPayCount: number;
  peopleCount: number;
  peopleAccommodationCount: number;
  peopleBuildingCount: number;
  teamsBuildingCount: number;
  peopleHutCount: number;
  teamsHutCount: number;
  peopleFoodCount: number;
  tshirtsCount: number;
  SummaryForPay: number;
  SummaryPay: number;
}
