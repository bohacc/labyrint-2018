import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ErrorDto } from '../../shared/model/ErrorDto';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html'
})
export class AlertsComponent implements OnDestroy {
  public msg: ErrorDto;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.errors.errors)
      .takeUntil(this.unsubscribe)
      .mergeMap(() => {
        return this.store.select(state => state.messages.messages);
      })
      .subscribe((errors) => {
        this.msg = errors[0];
        if (this.msg) {
          this.openDialog();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      /*width: '250px',*/
      data: this.msg
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
