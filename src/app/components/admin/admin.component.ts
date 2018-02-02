import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDto } from '../../modules/teams/models/TeamDto';
import { ConfigDbDto } from '../../shared/model/ConfigDbDto';
import { TeamsService } from '../../modules/teams/teams.service';
import { FoodService } from '../../modules/teams/services/foods.service';
import { State } from '../../modules/teams/state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { TshirtsService } from '../../modules/teams/services/tshirts.service';
import { AccommodationsService } from '../../modules/teams/services/accommodations.service';
import { Subject } from 'rxjs/Subject';
import { AccommodationsTypesEnum } from '../../modules/teams/models/AccommodationsTypesEnum';
import { AccommodationDto } from '../../shared/model/AccommodationDto';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
  public teamsCount: number;
  public teamsPayCount: number;
  public peopleCount: number;
  public peopleAccommodationCount: number;
  public peopleBuildingCount: number;
  public teamsBuildingCount: number;
  public peopleHutCount: number;
  public teamsHutCount: number;
  public peopleFoodCount: number;
  public tshirtsCount: number;
  public SummaryForPay: number;
  public SummaryPay: number;
  public teams: TeamDto[];
  public config: ConfigDbDto;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>,
    private tshirtsService: TshirtsService,
    private foodService: FoodService,
    private accommodationsService: AccommodationsService
  ) {
    this.initStore();
  }

  ngOnInit() {
    this.teamsService.loadTeams();
    this.tshirtsService.loadTShirts();
    this.foodService.loadFoods();
    this.accommodationsService.loadAccommodations();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  private initStore() {
    this.store.select(state => state)
      .subscribe((state) => {
        this.teams = state.teams.teams.list;
        this.recalculate();
      });
  }

  private recalculate() {
    this.teamsCount = this.teams.length;
    this.teamsPayCount = this.teams.filter((team: TeamDto) => {
      return !!team.paySent;
    }).length;
    this.peopleCount = this.teams.map((team: TeamDto) => {
      let count = 0;
      count += !!(team.player1.firstName + team.player1.lastName + team.player1.food) ? 1 : 0;
      count += !!(team.player2.firstName + team.player2.lastName + team.player2.food) ? 1 : 0;
      count += !!(team.player3.firstName + team.player3.lastName + team.player3.food) ? 1 : 0;
      count += !!(team.player4.firstName + team.player4.lastName + team.player4.food) ? 1 : 0;
      count += !!(team.player5.firstName + team.player5.lastName + team.player5.food) ? 1 : 0;
      return count;
    }).reduce((a, b) => a + b, 0);
    this.peopleAccommodationCount = this.teams.map((team: TeamDto) => {
      return this.accommodationsService.getAccommodation(team.accommodation).price;
    }).reduce((a, b) => a + b, 0);
    this.peopleBuildingCount = this.teams.map((team: TeamDto) => {
      const accommodation: AccommodationDto = this.accommodationsService.getAccommodation(team.accommodation);
      return AccommodationsTypesEnum.BUILDING === accommodation.type ? accommodation.count : 0;
    }).reduce((a, b) => a + b, 0);
    this.teamsBuildingCount = this.teams.map((team: TeamDto) => {
      const accommodation: AccommodationDto = this.accommodationsService.getAccommodation(team.accommodation);
      return AccommodationsTypesEnum.BUILDING === accommodation.type ? 1 : 0;
    }).reduce((a, b) => a + b, 0);
    this.peopleHutCount = this.teams.map((team: TeamDto) => {
      const accommodation: AccommodationDto = this.accommodationsService.getAccommodation(team.accommodation);
      return AccommodationsTypesEnum.HUT === accommodation.type ? accommodation.count : 0;
    }).reduce((a, b) => a + b, 0);
  }
}
