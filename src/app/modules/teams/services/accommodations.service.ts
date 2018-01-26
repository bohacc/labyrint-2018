import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadAccommodationsAction } from '../state/actions/accommodations.actions';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Accommodation } from '../models/AccommodationDto';
import { ConfigDbDto } from '../../../shared/model/ConfigDbDto';
import { LoadConfigAction } from '../../../state/actions/config.actions';
import { TeamsService } from '../teams.service';
import { TeamDto } from '../models/TeamDto';

@Injectable()
export class AccommodationsService implements OnDestroy {
  private itemsRef: AngularFireList<{accommodation: Accommodation}[]>;
  private itemsRefConfig: AngularFireList<ConfigDbDto[]>;
  private itemsRefTeams: AngularFireList<TeamDto[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase,
    private teamsService: TeamsService
  ) {
    this.itemsRef = this.db.list('accommodations', ref => ref.orderByChild('sort_order'));
    this.itemsRefConfig = this.db.list('config');
    this.itemsRefTeams = this.db.list('teams');
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
          const filteredAccommodations: Accommodation[] = this.getAvailableAccommodations(configDb, accommodations, teams);
          this.store.dispatch(new LoadAccommodationsAction(filteredAccommodations));
        }
      );
  }

  private getAvailableAccommodations(config: ConfigDbDto, accommodations: Accommodation[], teams: TeamDto[]): Accommodation[] {
    let filtered: Accommodation[] = [];
    filtered = accommodations.filter((item: Accommodation) => {
      return this.teamsService.availableAccommodation(item.value, accommodations, config, teams);
    });
    return filtered || [];
  }
}
