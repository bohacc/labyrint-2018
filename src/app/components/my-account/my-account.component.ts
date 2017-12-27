import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }
}
