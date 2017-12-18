import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ErrorDto } from '../../shared/model/ErrorDto';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.components.html'
})
export class AlertsComponent {
  public msg: ErrorDto;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.store.select(state => state.teams.errors)
      .subscribe((errors) => {
        this.msg = errors[0];
        this.openDialog();
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
