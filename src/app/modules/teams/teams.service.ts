import { Injectable, OnDestroy } from '@angular/core';
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
import { ConfigDbDto } from './models/ConfigDbDto';
import { Accommodation } from './models/AccommodationDto';
import { ToolsService } from '../../shared/services/tools.service';
import { AccommodationEnum } from './models/AccommodationEnum';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TeamsService implements OnDestroy {
  private itemsRef: AngularFireList<{team: TeamDto}[]>;
  private items: Observable<TeamDto[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>,
    private router: Router,
    private toolsService: ToolsService
  ) {
    this.itemsRef = this.db.list('teams');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public addItem(team: TeamDto) {
    // TODO: generate var symb
    // TODO: check rooms capacity
    console.log(team);
    if (!team || !team.name) {
      return;
    }
    let success = true;
    let teams: TeamDto[];
    let accommodations: Accommodation[];
    const teamWithoutPswd: any = {...team};
    delete teamWithoutPswd.password;
    this.db.database.ref('/teams/')
      .once('value', (snapchot) => {
        teams = this.toolsService.getArray(snapchot.val());
        console.log(teams);
        const exists: CheckExistsTeamDto = this.teamExists(team, teams);
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

        this.db.database.ref('/accommodations').once('value')
          .then(
            (accommodationsResult) => {
              accommodations = this.toolsService.getArray(accommodationsResult.val());
              console.log(accommodations);
              return this.db.database.ref('/config').once('value');
            })
          .then(
            (snapchotConfig) => {
              console.log(snapchotConfig.val());
              // available type accommodation
              if (!this.availableAccommodation(team.accommodation, accommodations, snapchotConfig.val(), teams)) {
                const error: ErrorDto = {
                  code: 'REGISTRATION_EXISTS',
                  title: 'Chyba výběru ubytování',
                  description: 'Vybrané ubytování není možné rezervovat, zkuste vybrat jiné.'
                };
                this.store.dispatch(new RegistrateTeamExistsAction(error));

                success = false;
                return null;
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

  public availableAccommodation(accommodation: string, accommodations: Accommodation[], config: ConfigDbDto, teams: TeamDto[]): boolean {
    console.log(accommodation);
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
          console.log(teams);
          this.store.dispatch(new LoadTeamsAction(teams || []));
        }
      );
  }
}

export interface Msg {
  success: boolean;
  msg: any;
}
