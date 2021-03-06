import { Routes } from '@angular/router';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { TeamsPageComponent } from './components/teams-page/teams-page.component';
import { TeamsComponent } from './teams.component';
import { AuthGuardService } from '../../shared/auth/auth.guard.service';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from '../../shared/services/adminGuard.service';

export const routes: Routes = [
  // {path: 'list', component: TeamsComponent},
  {path: '', component: TeamsComponent, children: [
      {path: 'list', component: TeamsPageComponent},
      {path: 'registration', component: TeamRegistrationComponent},
      {path: 'registration-success', component: RegistrationSuccessComponent},
      {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuardService]},
      {path: 'reset-password', component: ResetPasswordComponent},
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    ]}
];
