import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'registration', loadChildren: 'app/modules/registration/registration.module#RegistrationModule' }
];
