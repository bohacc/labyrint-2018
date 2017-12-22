import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import {
  CreateTeamAction, LoadTeamsAction, RegistrateTeamExistsAction, RemoveTeamAction,
  UpdateTeamAction
} from './state/actions/teams.actions';
import { TeamDto } from './models/TeamDto';
import { onerror } from 'q';
import { ErrorDto } from '../../shared/model/ErrorDto';
import { CheckExistsTeamDto } from './models/CheckExistsTeamDto';
import { Router } from '@angular/router';

@Injectable()
export class TeamsService {
  private itemsRef: AngularFireList<{team: TeamDto}[]>;
  private items: Observable<TeamDto[]>;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>,
    private router: Router
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
        const exists: CheckExistsTeamDto = this.teamExists(team, snapchot.val());
        console.log(exists);
        if (exists.exists) {
          const error: ErrorDto = {
            code: 'REGISTRATION_EXISTS',
            title: 'Chyba při přihlášení',
            description: exists.name ? 'Název týmu již existuje, zadejte jiný' : 'Email je již zaregistrovaný u jiného týmu'
          };
          this.store.dispatch(new RegistrateTeamExistsAction(error));
          return;
        }

        this.db.database
          .ref('/teams/' + teamWithoutPswd.name)
          .set(teamWithoutPswd)
          .catch((err) => {
            success = false;
          })
          .then(
            () => {
              // TODO: show success message
              // add dispatch action
              if (success) {
                this.store.dispatch(new CreateTeamAction(team));
                this.db.app.auth().createUserWithEmailAndPassword(team.email, team.password)
                  .then(() => {
                    this.router.navigate(['teams/registration-success']);
                  });
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

  private teamExists(newTeam: TeamDto, teams: {[name: string]: TeamDto}): CheckExistsTeamDto {
    const exists = {exists: false, eamil: false, name: false};
    Object.keys(teams).forEach((name: string) => {
      if (teams[name].name === newTeam.name) {
        exists.exists = true;
        exists.name = true;
      }
      if (teams[name].email === newTeam.email) {
        exists.exists = true;
        exists.eamil = true;
      }
    });
    return exists;
  }
}

export interface Msg {
  success: boolean;
  msg: any;
}
