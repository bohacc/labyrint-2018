import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { Observable } from 'rxjs/Observable';
import { LoginTeamDto } from '../../../../shared/model/LoginTeamDto';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public loginUser$: Observable<LoginTeamDto>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.loginUser$ = this.store.select(state => state.loginTeam.team);
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }

  public saveTeam() {}
}
