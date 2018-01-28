import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadAccommodationsAction, LoadAccommodationsForEditAction } from '../state/actions/accommodations.actions';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Accommodation } from '../models/AccommodationDto';
import { ConfigDbDto } from '../../../shared/model/ConfigDbDto';
import { LoadConfigAction } from '../../../state/actions/config.actions';
import { TeamsService } from '../teams.service';
import { TeamDto } from '../models/TeamDto';
import { LoginTeamDto } from '../../../shared/model/LoginTeamDto';

@Injectable()
export class AccommodationsService implements OnDestroy {
  private itemsRef: AngularFireList<{accommodation: Accommodation}[]>;
  private itemsRefConfig: AngularFireList<ConfigDbDto[]>;
  private itemsRefTeams: AngularFireList<TeamDto[]>;
  private unsubscribe: Subject<any> = new Subject();
  private loginTeam: LoginTeamDto;

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase,
    private teamsService: TeamsService
  ) {
    this.itemsRef = this.db.list('accommodations', ref => ref.orderByChild('sort_order'));
    this.itemsRefConfig = this.db.list('config');
    this.itemsRefTeams = this.db.list('teams');
    this.store.select(state => state)
      .subscribe((state) => {
        this.loginTeam = state.loginTeam.team;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadAccommodations() {
    let configDb: ConfigDbDto;
    let teams: TeamDto[];
    this.itemsRefTeams.snapshotChanges()
      .takeUntil(this.unsubscribe)
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .switchMap((items: TeamDto[]) => {
        teams = items;
        return this.itemsRefConfig.snapshotChanges()
          .map(changes => {
            return changes.map(c => ({...c.payload.val()}));
          });
      })
      .switchMap((config: ConfigDbDto[]) => {
        configDb = config[0];
        return this.itemsRef.snapshotChanges()
          .map(changes => {
            this.store.dispatch(new LoadConfigAction(configDb));
            return changes.map(c => ({...c.payload.val()}));
          });
      })
      .subscribe(
        (accommodations: Accommodation[]) => {
          const filteredAccommodations: Accommodation[] =
            this.getAvailableAccommodations(null, configDb, accommodations, teams);
          this.store.dispatch(new LoadAccommodationsAction(filteredAccommodations));
          const filteredAccommodationsEdit: Accommodation[] =
            this.getAvailableAccommodations(this.loginTeam, configDb, accommodations, teams);
          this.store.dispatch(new LoadAccommodationsForEditAction(filteredAccommodationsEdit));
        }
      );
  }

  private getAvailableAccommodations(
    team: TeamDto | LoginTeamDto,
    config: ConfigDbDto,
    accommodations: Accommodation[],
    teams: TeamDto[]
  ): Accommodation[] {
    let filtered: Accommodation[] = [];
    filtered = accommodations.filter((item: Accommodation) => {
      return this.teamsService.availableAccommodation(team, item.value, accommodations, {config: config}, teams);
    });
    return filtered || [];
  }
}
