import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private socialAuthService: SocialAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.buildUrl(request);

    const token = localStorage.getItem('token');
    if (token != null) {
      request = this.addToken(request, token);
    }

    return next.handle(request);
  }

  private buildUrl = (request: HttpRequest<any>) => {
    return request.clone({
      url: environment.apiUrl + request.url,
    });
  }

  private addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error = (request: HttpRequest<any>, next: HttpHandler) => {
    return this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(_ => {
      this.socialAuthService.authState.subscribe((user) => {
        if (user !== null) {
          localStorage.setItem('token', user.idToken);
          return next.handle(this.addToken(request, user.idToken));
        }
      });
    });

  }
}
