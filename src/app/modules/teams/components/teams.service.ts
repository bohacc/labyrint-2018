import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as Actions from '../../../state/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { CreateTeamAction, LoadTeamsAction, TeamsActions } from '../state/actions/teams.actions';
import { TeamDto } from '../models/TeamDto';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TeamsService {
  private itemsRef: AngularFireList<TeamDto>;
  private items: Observable<TeamDto[]>;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    this.itemsRef = db.list('teams');

    // this.db.list('teams')

    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.items
      .subscribe(
        (teams: TeamDto[]) => {
          this.store.dispatch(new LoadTeamsAction(teams || []));
        }
      );
  }

  public addItem(newName: string) {
    this.itemsRef.push({ name: newName })
      .then(
        () => {
          // add dispatch action
        },
        (err) => {
          // add dispatch action
        }
      );
  }

  public updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { name: newText });
  }

  public deleteItem(key: string) {
    this.itemsRef.remove(key);
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
