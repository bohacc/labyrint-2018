import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

export const routes: Routes = [
  {
    path: 'new', component: RegistrationFormComponent,
    /*children: [
      {path: 'new', component: RegistrationFormComponent}
    ]*/
  }
];
