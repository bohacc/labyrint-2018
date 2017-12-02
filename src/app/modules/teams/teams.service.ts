import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadTeamsAction, RemoveTeamAction } from './state/actions/teams.actions';
import { TeamDto } from './models/TeamDto';

@Injectable()
export class TeamsService {
  private itemsRef: AngularFireList<{team: TeamDto}>;
  private items: Observable<TeamDto[]>;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    // this.db.app.auth().createUserWithEmailAndPassword();
    this.itemsRef = this.db.list('teams');

    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val().team }));
    });

    this.items
      .subscribe(
        (teams: TeamDto[]) => {
          this.store.dispatch(new LoadTeamsAction(teams || []));
        }
      );
  }

  public addItem(team: TeamDto) {
    const teamWithoutKey: any = {...team};
    delete teamWithoutKey.key;
    this.itemsRef.push({team: teamWithoutKey})
      .then(
        () => {
          // add dispatch action
        },
        (err) => {
          // add dispatch action
        }
      );
  }

  public updateItem(team: TeamDto) {
    const teamWithoutKey: any = {...team};
    delete teamWithoutKey.key;
    this.itemsRef.update(team.key, teamWithoutKey);
  }

  public deleteItem(team: TeamDto) {
    this.itemsRef.remove(team.key);
    this.store.dispatch(new RemoveTeamAction(team));
  }

  public deleteEverything() {
    this.itemsRef.remove();
  }

  public getTeams(): Observable<TeamDto[]> {
    return this.items;
  }
}

export interface Msg {
  success: boolean;
  msg: any;
}
