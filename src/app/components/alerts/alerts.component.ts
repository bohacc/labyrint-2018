import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ErrorDto } from '../../shared/model/ErrorDto';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html'
})
export class AlertsComponent {
  public msg: ErrorDto;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.errors.errors)
      .subscribe((errors) => {
        this.msg = errors[0];
        if (this.msg) {
          this.openDialog();
        }
      });
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
