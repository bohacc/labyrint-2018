import { NgModule } from '@angular/core';
import { StoreService } from '../shared/store/store.service';
import { AuthService } from '../shared/auth/auth.service';
import { TrustHtmlPipe } from '../shared/pipes/trust-html/trust-html.pipe';

@NgModule({
  declarations: [
    TrustHtmlPipe
  ],
  imports: [],
  exports: [TrustHtmlPipe],
  providers: [
    StoreService,
    AuthService,
    TrustHtmlPipe
  ]
})
export class SharedServiceModule {

}
