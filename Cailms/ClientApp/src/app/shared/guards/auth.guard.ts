import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private authService: AuthService) {}

  canActivate(): Promise<boolean> | boolean {
    if (this.authService.isAuthorized()) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
