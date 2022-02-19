import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Token} from '../modules/auth/models/token.model';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public CailmsProviderID = 'Cailms';

  constructor(private http: HttpClient, private socialAuthService: SocialAuthService) {

  }

  login = (email: string, password: string) => {
    return this.http.post<Token>(`/api/users/login`, {
      email,
      password
    }).pipe(
      tap(token => this.setToken(token.token, token.refreshToken, this.CailmsProviderID)),
      mapTo(true),
      catchError(_ => {
        return of(false);
      }));
  }

  signup = (email: string, password: string, passwordRepeat: string) => {
    return this.http.post<Token>(`/api/users/signup`, {
      email,
      password,
      passwordRepeat
    }).pipe(mapTo(true),
      catchError(_ => {
        return of(false);
      }));
  }

  isAuthorized = () => {
    return localStorage.getItem('token') !== null;
  }

  loginWithGoogle = () => {
    const googleLoginOptions = {scope: 'profile email'};
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions).then(user => {
      this.setToken(user.idToken, null, GoogleLoginProvider.PROVIDER_ID);
    });
  }

  authState = () => {
    return this.socialAuthService.authState;
  }

  logOut = () => {
    const provider = localStorage.getItem('provider');
    if (provider !== this.CailmsProviderID) {
      return this.socialAuthService.signOut().then(_ => {
        this.removeToken();
      });
    }
    else {
      return new Promise((resolve, reject) => {
        // call logout api
        this.removeToken();
        resolve();
      });
    }
  }

  removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('provider');
  }

  setToken = (token: string, refreshToken: string, provider: string) => {
    localStorage.setItem('token', token);
    if (refreshToken != null) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    localStorage.setItem('provider', provider);
  }
}
