import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-left-sider-layout',
  templateUrl: './left-sider-layout.component.html',
  styleUrls: ['./left-sider-layout.component.scss']
})
export class LeftSiderLayoutComponent implements OnInit {

  user: SocialUser;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  navigate = (path: string) => {
    this.router.navigate([path]);
  }


  isActive(url: string): boolean {
    return this.router.isActive(url, false);
  }

  logout = () => {
    this.authService.logOut().then(_ => {
      this.router.navigate(['login']);
    });
  }

}
