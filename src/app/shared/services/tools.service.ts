import { Injectable, OnDestroy } from '@angular/core';
import { State } from '../../modules/teams/state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { ConfigDbDto } from '../model/ConfigDbDto';
import { SetDisableRegistrationAction } from '../../state/actions/registration.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ToolsService implements OnDestroy {
  private unsubscribe: Subject<any> = new Subject();
  private config: ConfigDbDto;

  constructor(
    private store: Store<State>,
    private http: HttpClient
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

  private checkLimitDate(current: Date, start: Date, end: Date) {
    if (current >= start && current <= end) {
      this.store.dispatch(new SetDisableRegistrationAction(false));
    } else {
      this.store.dispatch(new SetDisableRegistrationAction(true));
    }
  }

  public checkRegistrationLimits() {
    const start: Date = new Date(this.config.open_registration);
    const end: Date = new Date(this.config.close_registration);
    let current: Date = new Date();
    const headersAdditional: HttpHeaders = new HttpHeaders();
    headersAdditional.append('Cache-control', 'no-cache');
    headersAdditional.append('Cache-control', 'no-store');
    headersAdditional.append('Expires', '0');
    headersAdditional.append('Pragma', 'no-cache');
    this.http.get('/checkLimit?rnd=' + Math.random(), {headers: headersAdditional})
      .subscribe(
        (response: any) => {
          current = new Date(response.date);
          this.checkLimitDate(current, start, end);
        },
        () => {
          this.checkLimitDate(current, start, end);
        },
      );
  }
}
