import { Routes } from '@angular/router';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { TeamsPageComponent } from './components/teams-page/teams-page.component';
import { TeamsComponent } from './teams.component';

export const routes: Routes = [
  // {path: 'list', component: TeamsComponent},
  {path: '', component: TeamsComponent, children: [
    {path: 'list', component: TeamsPageComponent},
    {path: 'registration', component: TeamRegistrationComponent},
    {path: 'registration-success', component: RegistrationSuccessComponent}
  ]}
];
