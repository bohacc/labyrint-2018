import { Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';

export const routes: Routes = [
  { path: 'list', component: TeamsComponent },
  { path: 'registration', component: TeamRegistrationComponent }
];
