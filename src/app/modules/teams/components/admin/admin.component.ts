import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDto } from '../../models/TeamDto';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';
import { TeamsService } from '../../teams.service';
import { FoodService } from '../../services/foods.service';
import { State } from '../../state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { TshirtsService } from '../../services/tshirts.service';
import { AccommodationsService } from '../../services/accommodations.service';
import { Subject } from 'rxjs/Subject';
import { AccommodationsTypesEnum } from '../../models/AccommodationsTypesEnum';
import { AccommodationDto } from '../../../../shared/model/AccommodationDto';

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
  public payAmountAccommodations: number;
  public payAmountTshirts: number;
  public paySentAmount: number;
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
        this.config = state.config.config;
        this.recalculate();
      });
  }

  private recalculate() {
    this.teamsCount = this.teams.length;

    this.teamsPayCount = this.teams.filter((team: TeamDto) => {
      return team.paySent;
    }).length;

    this.payAmountAccommodations = this.teams.map((team: TeamDto) => {
      return this.accommodationsService.getAccommodation(team.accommodation).price;
    }).reduce((a, b) => a + b, 0);

    this.payAmountTshirts = this.teams.map((team: TeamDto) => {
      let price = 0;
      const tshirt1 = this.tshirtsService.getTshirts(team.player1.tshirt);
      const tshirt2 = this.tshirtsService.getTshirts(team.player2.tshirt);
      const tshirt3 = this.tshirtsService.getTshirts(team.player3.tshirt);
      const tshirt4 = this.tshirtsService.getTshirts(team.player4.tshirt);
      const tshirt5 = this.tshirtsService.getTshirts(team.player5.tshirt);
      price += tshirt1 ? tshirt1.price : 0;
      price += tshirt2 ? tshirt2.price : 0;
      price += tshirt3 ? tshirt3.price : 0;
      price += tshirt4 ? tshirt4.price : 0;
      price += tshirt5 ? tshirt5.price : 0;
      return price;
    }).reduce((a, b) => a + b, 0);

    this.paySentAmount = this.teams.map((team: TeamDto) => {
      const accommodation = this.accommodationsService.getAccommodation(team.accommodation);
      const tshirt1 = this.tshirtsService.getTshirts(team.player1.tshirt);
      const tshirt2 = this.tshirtsService.getTshirts(team.player2.tshirt);
      const tshirt3 = this.tshirtsService.getTshirts(team.player3.tshirt);
      const tshirt4 = this.tshirtsService.getTshirts(team.player4.tshirt);
      const tshirt5 = this.tshirtsService.getTshirts(team.player5.tshirt);
      let tshirtPrice = 0;
      tshirtPrice += tshirt1 ? tshirt1.price : 0;
      tshirtPrice += tshirt2 ? tshirt2.price : 0;
      tshirtPrice += tshirt3 ? tshirt3.price : 0;
      tshirtPrice += tshirt4 ? tshirt4.price : 0;
      tshirtPrice += tshirt5 ? tshirt5.price : 0;
      const registrationPrice = this.config.registration_price || 0;
      return (accommodation ? accommodation.price : 0) + tshirtPrice + registrationPrice;
    }).reduce((a, b) => a + b, 0);

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
      return this.accommodationsService.getAccommodation(team.accommodation).count;
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

    this.teamsHutCount = this.teams.map((team: TeamDto) => {
      const accommodation: AccommodationDto = this.accommodationsService.getAccommodation(team.accommodation);
      return AccommodationsTypesEnum.HUT === accommodation.type ? 1 : 0;
    }).reduce((a, b) => a + b, 0);

    this.peopleFoodCount = this.peopleAccommodationCount;

    this.tshirtsCount = this.teams.map((team: TeamDto) => {
      let count = 0;
      count += (team.player1.tshirt && this.tshirtsService.getTshirts(team.player1.tshirt).price > 0) ? 1 : 0;
      count += (team.player2.tshirt && this.tshirtsService.getTshirts(team.player2.tshirt).price > 0) ? 1 : 0;
      count += (team.player3.tshirt && this.tshirtsService.getTshirts(team.player3.tshirt).price > 0) ? 1 : 0;
      count += (team.player4.tshirt && this.tshirtsService.getTshirts(team.player4.tshirt).price > 0) ? 1 : 0;
      count += (team.player5.tshirt && this.tshirtsService.getTshirts(team.player5.tshirt).price > 0) ? 1 : 0;
      return count;
    }).reduce((a, b) => a + b, 0);
  }
}
