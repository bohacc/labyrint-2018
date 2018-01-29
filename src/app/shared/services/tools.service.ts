import { Injectable, OnDestroy } from '@angular/core';
import { State } from '../../modules/teams/state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { ConfigDbDto } from '../model/ConfigDbDto';
import { SetDisableRegistrationAction } from '../../state/actions/registration.actions';

@Injectable()
export class ToolsService implements OnDestroy {
  private unsubscribe: Subject<any> = new Subject();
  private config: ConfigDbDto;

  constructor(
    private store: Store<State>,
  ) {
    this.store.select(state => state)
      .takeUntil(this.unsubscribe)
      .subscribe((state) => {
        this.config = state.config.config;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public getArray(object: any): any[] {
    const arr = [];
    if (object) {
      Object.keys(object).forEach((name: string) => {
        arr.push(object[name]);
      });
    }
    return arr;
  }

  public checkRegistrationLimits() {
    const start: Date = new Date(this.config.open_registration);
    const end: Date = new Date(this.config.close_registration);
    const current: Date = new Date();
    if (current >= start && current <= end) {
      this.store.dispatch(new SetDisableRegistrationAction(false));
    } else {
      this.store.dispatch(new SetDisableRegistrationAction(true));
    }
  }
}
