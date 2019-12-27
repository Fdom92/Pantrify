import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthRootComponent } from './containers/auth-root/auth-root.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthRootComponent,
    LoginComponent,
    SignupComponent
  ],
  entryComponents: [],
  exports: [],
})
export class AuthModule { }
