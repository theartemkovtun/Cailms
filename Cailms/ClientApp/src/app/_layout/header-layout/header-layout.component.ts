import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {

  user: SocialUser;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll = () => {
    const element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > 1) {
      element.classList.add('header-scrolled');
    } else {
      element.classList.remove('header-scrolled');
    }
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  navigateToTransferCreation = () => {
    this.router.navigate(['transfer']);
  }

  navigateToProfile = () => {
    this.router.navigate(['profile']);
  }
}
