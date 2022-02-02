import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {NzButtonModule} from 'ng-zorro-antd';
import {AuthTokenInterceptor} from '../../shared/interceptors/authToken.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { environment } from '../../../environments/environment';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SocialLoginModule,
    NzButtonModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.googleAuthClientId)
        }
      ]
    } as SocialAuthServiceConfig,
  }],
})
export class AuthModule { }
