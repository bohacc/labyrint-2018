import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { UserAuthDto } from '../model/UserAuthDto';
import { LoginTeamDto } from '../model/LoginTeamDto';
import { LoginTeamAction } from '../../state/actions/login-team.actions';
import { TeamDto } from '../../modules/teams/models/TeamDto';
import { ToolsService } from './tools.service';
import { Accommodation } from '../../modules/teams/models/AccommodationDto';
import { TshirtDto } from '../model/TshirtDto';
import { AccommodationDto } from '../model/AccommodationDto';
import { ConfigDbDto } from '../model/ConfigDbDto';
import { NewsDto } from '../model/newsDto';

@Injectable()
export class DatabaseService {
  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>,
    private toolsService: ToolsService
  ) {

  }

  public getNews(): Observable<any[]> {
    return this.db.list('news', ref => ref.orderByChild('sort_order')).valueChanges()
      .map((items) => items.reverse());
  }

  public getLoginTeam(userAuth: UserAuthDto | LoginTeamDto | TeamDto) {
    let accommodations: AccommodationDto[] = [];
    let tshirts: TshirtDto[] = [];
    let config: ConfigDbDto;
    let loginTeam: LoginTeamDto;
    this.db.database.ref('/teams/').once('value')
      .then((snapchot) => {
        const teams: TeamDto[] = this.toolsService.getArray(snapchot.val());
        const currentTeam: any = teams.filter((team: TeamDto) => {
          return team.email === userAuth.email;
        }).map((team) => {
          return team;
        })[0];
        if (!currentTeam) {
          return;
        }
        delete currentTeam.password;
        delete currentTeam.password2;
        loginTeam = {...currentTeam, ...{payAccount: null, payAmount: null}};
        return this.db.database.ref('/accommodations/').once('value');
      })
      .then(
        (snapchot) => {
          if (snapchot) {
            accommodations = this.toolsService.getArray(snapchot.val());
          }
          return this.db.database.ref('/tshirts/').once('value');
        }
      )
      .then(
        (snapchot) => {
          if (snapchot) {
            tshirts = this.toolsService.getArray(snapchot.val());
          }
          return this.db.database.ref('/config/').once('value');
        }
      )
      .then(
      (snapchot) => {
        if (snapchot) {
          config = snapchot.val();
        }
        this.updateWithPayInfo(loginTeam, tshirts, accommodations, config);
        if (loginTeam) {
          this.store.dispatch(new LoginTeamAction(loginTeam));
        } else {
          this.store.dispatch(new LoginTeamAction(null));
        }
      }
    );
  }

  private updateWithPayInfo(loginTeam: LoginTeamDto, tshirts: TshirtDto[], accommodations: AccommodationDto[],
                            config: ConfigDbDto) {
    const accommodation = (accommodations || [{price: 0}]).filter((acc: AccommodationDto) => {
      return acc.value === loginTeam.accommodation;
    })[0];
    const accommodationPrice = accommodation ? accommodation.price : 0;
    let tshirtsPrice = 0;
    let playerCount = 0;
    const registrationPrice = (config.config.registration_price || 0);
    if (loginTeam && loginTeam.player1 &&
      loginTeam && loginTeam.player2 &&
      loginTeam && loginTeam.player3 &&
      loginTeam && loginTeam.player4 &&
      loginTeam && loginTeam.player5
    ) {
      playerCount =
        (!!(loginTeam.player1.firstName + loginTeam.player1.lastName) ? 1 : 0) +
        (!!(loginTeam.player2.firstName + loginTeam. player2.lastName) ? 1 : 0) +
        (!!(loginTeam.player3.firstName + loginTeam.player3.lastName) ? 1 : 0) +
        (!!(loginTeam.player4.firstName + loginTeam.player4.lastName) ? 1 : 0) +
        (!!(loginTeam.player5.firstName + loginTeam.player5.lastName) ? 1 : 0);
      tshirtsPrice =
        (tshirts.filter((tshirt: TshirtDto) => tshirt.value === loginTeam.player1.tshirt)[0] || {price: 0}).price +
        (tshirts.filter((tshirt: TshirtDto) => tshirt.value === loginTeam.player2.tshirt)[0] || {price: 0}).price +
        (tshirts.filter((tshirt: TshirtDto) => tshirt.value === loginTeam.player3.tshirt)[0] || {price: 0}).price +
        (tshirts.filter((tshirt: TshirtDto) => tshirt.value === loginTeam.player4.tshirt)[0] || {price: 0}).price +
        (tshirts.filter((tshirt: TshirtDto) => tshirt.value === loginTeam.player5.tshirt)[0] || {price: 0}).price;
      loginTeam.payAccount = config.config.pay_account;
      loginTeam.payAmount = accommodationPrice + tshirtsPrice + registrationPrice;
      loginTeam.accommodationPrice = accommodationPrice;
      loginTeam.tshirtsPrice = tshirtsPrice;
    }
  }

  public getRulesOfTheGame(): Observable<any> {
    return this.db.list('/rules_of_the_game/', ref => ref.orderByChild('sort_order'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      });
  }

  public getCiphersOfTheGame(): Observable<any> {
    return this.db.list('/ciphers_of_the_game/', ref => ref.orderByChild('sort_order'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      });
  }

  public getResultsOfTheGame(): Observable<any> {
    return this.db.list('/results_of_the_game/', ref => ref.orderByChild('sort_order'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      });
  }

  public getContactOfTheGame(): Observable<any> {
    return this.db.list('/contact_of_the_game/', ref => ref.orderByChild('sort_order'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      });
  }
}
