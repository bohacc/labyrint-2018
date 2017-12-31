import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserAuthDto } from '../../shared/model/UserAuthDto';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['app-header.component.scss']
})
export class AppHeaderComponent implements OnDestroy {

  constructor(
  ) {

  }

  ngOnDestroy(): void {

  }
}
