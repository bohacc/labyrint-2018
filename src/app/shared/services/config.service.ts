import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ConfigDbDto } from '../model/ConfigDbDto';
import { AppState } from '../../state/app.state';
import { LoadConfigAction } from '../../state/actions/config.actions';
import { ToolsService } from './tools.service';

@Injectable()
export class ConfigService implements OnDestroy {
  private itemsRef: AngularFireList<{config: ConfigDbDto}>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase,
    private toolsService: ToolsService
  ) {
    this.itemsRef = this.db.list('config');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadConfig() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .takeUntil(this.unsubscribe)
      .subscribe(
        (config: ConfigDbDto[]) => {
          this.store.dispatch(new LoadConfigAction(config[0]));
          setTimeout(() => {
            this.toolsService.checkRegistrationLimits();
            }, 100
          );
        }
      );
  }
}
