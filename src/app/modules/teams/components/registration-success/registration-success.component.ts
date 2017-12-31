import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../shared/auth/auth.service';
import { AppState } from '../../../../state/app.state';
import { Observable } from 'rxjs/Observable';
import { LoginTeamDto } from '../../../../shared/model/LoginTeamDto';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss']
})
export class RegistrationSuccessComponent implements OnInit {
  public loginUser$: Observable<LoginTeamDto>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.loginUser$ = this.store.select(state => state.loginTeam.team);
  }

  ngOnInit() {
  }

}
