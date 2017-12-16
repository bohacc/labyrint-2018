import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { CreateTeamAction, LoadTeamsAction, RemoveTeamAction, UpdateTeamAction } from './state/actions/teams.actions';
import { TeamDto } from './models/TeamDto';

@Injectable()
export class TeamsService {
  private itemsRef: AngularFireList<{team: TeamDto}[]>;
  private items: Observable<TeamDto[]>;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    this.itemsRef = this.db.list('teams');

    // Use snapshotChanges().map() to store the key
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      })
      .subscribe(
        (teams: TeamDto[]) => {
          console.log(teams);
          this.store.dispatch(new LoadTeamsAction(teams || []));
        }
      );
  }

  public addItem(team: TeamDto) {
    console.log(team);
    if (!team || !team.name) {
      return;
    }
    let success = true;
    const teamWithoutPswd: any = {...team};
    delete teamWithoutPswd.password;
    this.db.database
      .ref('/teams/')
      .once('value', (snapchot) => {
        console.log(snapchot.val());
        if (this.teamExists(team, snapchot.val())) {
          // TODO: show error
          console.log('TEAM EXISTS');
          return;
        }

        this.db.database
          .ref('/teams/' + teamWithoutPswd.name)
          .set(teamWithoutPswd)
          .catch((err) => {
            console.log('CATCH');
            console.log(err);
            success = false;
          })
          .then(
            () => {
              // TODO: show success message
              // add dispatch action
              if (success) {
                console.log('ADD ITEM SUCCESS');
                this.store.dispatch(new CreateTeamAction(team));
                this.db.app.auth().createUserWithEmailAndPassword(team.email, team.password);
              }
            },
            (err) => {
              // TODO: show error
              // add dispatch action
              console.log('ADD ITEM ERROR');
              console.log(err);
            }
          );
      });
  }

  public updateItem(team: TeamDto) {
    let success = true;
    // TODO: disable edit registration email
    this.db.database
      .ref('/teams/' + team.name)
      .update(team)
      .catch((err) => {
        console.log('CATCH');
        console.log(err);
        success = false;
      })
      .then(
        () => {
          // TODO: show success message
          console.log('update success');
          if (success) {
            this.store.dispatch(new UpdateTeamAction(team));
          }
        },
        (err) => {
          // TODO: show error
          console.log(err);
        }
      );
  }

  public deleteItem(team: TeamDto) {
    let success = true;
    // TODO: add delete user auth
    this.itemsRef.remove(team.name);
    this.db.database
      .ref('/teams/' + team.name)
      .remove()
      .catch((err) => {
        console.log('CATCH');
        console.log(err);
        success = false;
      })
      .then(
        () => {
          // TODO: show success message
          console.log('update success');
          if (success) {
            this.store.dispatch(new RemoveTeamAction(team));
          }
        },
        (err) => {
          // TODO: show error
          console.log(err);
        }
      );
  }

  public deleteEverything() {
    this.itemsRef.remove();
  }

  private teamExists(newTeam: TeamDto, teams: {[name: string]: TeamDto}) {
    let exists = false;
    Object.keys(teams).forEach((name: string) => {
      if (teams[name].name === newTeam.name || teams[name].email === newTeam.email) {
        exists = true;
      }
    });
    return exists;
  }
}

export interface Msg {
  success: boolean;
  msg: any;
}
