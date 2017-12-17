import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadAccommodationsAction } from '../state/actions/accommodations.actions';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Accommodation } from '../models/AccommodationDto';

@Injectable()
export class AccommodationsService implements OnDestroy {
  private itemsRef: AngularFireList<{accommodation: Accommodation}[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('accommodations');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadAccommodations() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .takeUntil(this.unsubscribe)
      .subscribe(
        (accommodations: Accommodation[]) => {
          this.store.dispatch(new LoadAccommodationsAction(accommodations));
        }
      );
  }
}
