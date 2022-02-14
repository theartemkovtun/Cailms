import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {AuthTokenInterceptor} from '../../shared/interceptors/authToken.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { environment } from '../../../environments/environment';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { SignupComponent } from './containers/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NzGridModule} from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SocialLoginModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzIconModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule
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
