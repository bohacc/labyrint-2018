import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import {
  CreateTeamAction, LoadTeamsAction, RegistrateTeamExistsAction, RemoveTeamAction,
  UpdateTeamAction, PendingActions
} from './state/actions/teams.actions';
import { TeamDto } from './models/TeamDto';
import { onerror } from 'q';
import { ErrorDto } from '../../shared/model/ErrorDto';
import { CheckExistsTeamDto } from './models/CheckExistsTeamDto';
import { Router } from '@angular/router';
import { ConfigDbDto } from '../../shared/model/ConfigDbDto';
import { Accommodation } from './models/AccommodationDto';
import { ToolsService } from '../../shared/services/tools.service';
import { AccommodationEnum } from './models/AccommodationEnum';
import { Subject } from 'rxjs/Subject';
import * as ErrorsActions from '../../state/actions/errors.actions';
import { LoginTeamAction } from '../../state/actions/login-team.actions';
import { LoginTeamDto } from '../../shared/model/LoginTeamDto';
import { DatabaseService } from '../../shared/services/database.service';
import * as MessagesActions from '../../state/actions/messages.actions';
import { MessageDto } from '../../shared/model/messageDto';

@Injectable()
export class TeamsService implements OnDestroy {
  private itemsRef: AngularFireList<{team: TeamDto}[]>;
  private items: Observable<TeamDto[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>,
    private router: Router,
    private toolsService: ToolsService,
    private databaseService: DatabaseService
  ) {
    this.itemsRef = this.db.list('teams', ref => ref.orderByChild('name'));
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public addItem(team: TeamDto) {
    if (!team || !team.name) {
      return;
    }
    let success = true;
    let teams: TeamDto[];
    let accommodations: Accommodation[];
    const teamWithoutPswd: any = {...team, ...{payId: (Date.now() + '').substr(3)}};
    delete teamWithoutPswd.password;
    this.db.database.ref('/teams/')
      .once('value')
      .then(
        (snapchot) => {
          teams = this.toolsService.getArray(snapchot.val());
          const exists: CheckExistsTeamDto = this.teamExists(team, teams);
          if (exists.exists) {
            const error: ErrorDto = {
              code: 'REGISTRATION_EXISTS',
              title: 'Chyba při přihlášení',
              description: exists.name ? 'Název týmu již existuje, zadejte jiný' : 'Email je již zaregistrovaný u jiného týmu'
            };
            this.store.dispatch(new ErrorsActions.ErrorAction([error]));
            return;
          }
          this.db.database.ref('/accommodations')
            .once('value')
            .then(
              (accommodationsResult) => {
                accommodations = this.toolsService.getArray(accommodationsResult.val());
                return this.db.database.ref('/config').once('value');
              })
            .then(
              (snapchotConfig) => {
                // available type accommodation
                if (!this.availableAccommodation(team.accommodation, accommodations, snapchotConfig.val(), teams)) {
                  const error: ErrorDto = {
                    code: 'REGISTRATION_EXISTS',
                    title: 'Chyba výběru ubytování',
                    description: 'Vybrané ubytování není možné rezervovat, zkuste vybrat jiné.'
                  };
                  // this.store.dispatch(new ErrorsActions.ErrorAction([error]));

                  success = false;
                  return Promise.reject(error);
                }
                return this.db.database.ref('/teams/' + teamWithoutPswd.name).set(teamWithoutPswd)
                  .catch((err) => {
                    success = false;
                  });
              })
            .then(() => {
                if (success) {
                  this.store.dispatch(new CreateTeamAction(team));
                  this.db.app.auth().createUserWithEmailAndPassword(team.email, team.password)
                    .then(
                      () => {
                        this.router.navigate(['teams/registration-success']);
                      },
                      (err) => {
                        let msg = '';
                        if (err && err.code === 'auth/weak-password') {
                          msg = 'Chybný formát hesla (' + err.message + ')';
                        }
                        if (err && err.code === 'auth/email-already-in-use') {
                          msg = 'The email address is already in use by another account(' + team.email + ')';
                        }
                        const error: ErrorDto = {
                          code: 'REGISTRATION_EXISTS',
                          title: 'Chyba registrace',
                          description: msg
                        };
                        this.store.dispatch(new ErrorsActions.ErrorAction([error]));
                        this.store.dispatch(new PendingActions(false));
                      }
                    );
                } else {
                  this.store.dispatch(new PendingActions(false));
                }
              },
              (err) => {
                /*const error: ErrorDto = {
                  code: 'REGISTRATION_EXISTS',
                  title: 'Chyba registrace',
                  description: err
                };*/
                // this.store.dispatch(new RegistrateTeamExistsAction(error));
                this.store.dispatch(new ErrorsActions.ErrorAction([err]));
                this.store.dispatch(new PendingActions(false));
                console.log(err);
              }
            );
        });
  }

  public updateItem(team: LoginTeamDto) {
    let success = true;
    this.db.database
      .ref('/teams/' + team.name)
      .update(team)
      .catch((err) => {
        console.log(err);
        success = false;
        this.store.dispatch(new PendingActions(false));
      })
      .then(
        () => {
          if (success) {
            this.store.dispatch(new LoginTeamAction(team));
            this.databaseService.getLoginTeam(team);
            const msg: MessageDto = {
              code: 'REGISTRATION_EDIT',
              title: 'Úprava registrace',
              description: 'Změny byly uloženy'
            };
            this.store.dispatch(new MessagesActions.MessageAction([msg]));
            this.store.dispatch(new PendingActions(false));
          }
        },
        (err) => {
          const error: ErrorDto = {
            code: 'REGISTRATION_EDIT_ERROR',
            title: 'Chyba při ukládání změn registrace',
            description: 'Registrace nebyla uložena.(' + err + ')'
          };
          this.store.dispatch(new ErrorsActions.ErrorAction([error]));
          this.store.dispatch(new PendingActions(false));
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
        console.log(err);
        success = false;
      })
      .then(
        () => {
          // TODO: show success message
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

  private teamExists(newTeam: TeamDto, teams: TeamDto[]): CheckExistsTeamDto {
    const exists = {exists: false, eamil: false, name: false};
    teams.forEach((team: TeamDto) => {
      if (team.name === newTeam.name) {
        exists.exists = true;
        exists.name = true;
      }
      if (team.email === newTeam.email) {
        exists.exists = true;
        exists.eamil = true;
      }
    });
    return exists;
  }

  public availableAccommodation(
    accommodation: string, accommodations: Accommodation[],
    config: {config: ConfigDbDto},
    teams: TeamDto[]
  ): boolean {
    let result = false;
    let count = 0;
    try {
      const selected: Accommodation = accommodations.filter((item) => {
        return item.value === accommodation;
      })[0];

      teams.forEach((team: TeamDto) => {
        if (team.accommodation === selected.type) {
          count += accommodations.filter((item: Accommodation) => {
            return item.value === team.accommodation;
          })[0].count;
        }
      });

      if (selected.type === AccommodationEnum.HUT) {
        result = (selected.count + count) <= config.config.hut4;
      } else if (selected.type === AccommodationEnum.BUILDING) {
        result = (selected.count + count) <= config.config.building4;
      }
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  public loadTeams() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val() }));
      })
      .subscribe(
        (teams: TeamDto[]) => {
          this.store.dispatch(new LoadTeamsAction(teams || []));
        }
      );
  }

  public loadTeam(userId: string): Observable<TeamDto> {
    // return this.db.database.ref('/teams/');
    return Observable.of(null);
  }
}
