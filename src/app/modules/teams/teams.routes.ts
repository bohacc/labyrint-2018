import { Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { RegistrationFormComponent } from '../registration/components/registration-form/registration-form.component';

export const routes: Routes = [
  {
    path: 'list', component: TeamsComponent,
  }
];
