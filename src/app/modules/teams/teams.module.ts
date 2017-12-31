import { NgModule } from '@angular/core';
import { TeamsService } from './teams.service';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamsPageComponent } from './components/teams-page/teams-page.component';
import { routes } from './teams.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { ReCaptchaModule } from '../captcha/ReCaptcha.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../material/material.module';
import { TshirtsService } from './services/tshirts.service';
import { FoodService } from './services/foods.service';
import { AccommodationsService } from './services/accommodations.service';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { TeamsComponent } from './teams.component';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './state/reducers/module.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamsPageComponent,
    TeamRegistrationComponent,
    RegistrationSuccessComponent,
    TeamsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('teams', reducers),
    EffectsModule.forFeature([]),
    ReCaptchaModule,
    CustomMaterialModule
  ],
  providers: [
    TeamsService,
    TshirtsService,
    FoodService,
    AccommodationsService
  ]
})
export class TeamsModule {}
