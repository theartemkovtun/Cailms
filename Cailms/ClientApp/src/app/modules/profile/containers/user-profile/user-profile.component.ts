import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: SocialUser;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  backToStatistics = () => {
    this.router.navigate(['/']);
  }

  logout = () => {
    this.authService.logOut().then(_ => {
      this.router.navigate(['login']);
    });
  }
}
