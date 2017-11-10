import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

export const routes: Routes = [
  { path: '', component: RegistrationFormComponent },
  { path: 'team/:id', component: RegistrationFormComponent }
];
