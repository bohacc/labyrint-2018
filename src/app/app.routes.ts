import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'uvod', component: HomeComponent },
  { path: 'registration', loadChildren: 'app/modules/registration/registration.module#RegistrationModule' },
  { path: 'teams', loadChildren: 'app/modules/teams/teams.module#TeamsModule' },
];
