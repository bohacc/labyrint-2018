import { NgModule } from '@angular/core';
import { StoreService } from '../shared/store/store.service';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    StoreService,
    AuthService
  ]
})
export class SharedServiceModule {

}
