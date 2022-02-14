import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then(_ => this.router.navigate(['statistics']));
  }

  login = () => {
    this.isLoginFailed = false;
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['statistics']);
      }
      else {
        this.isLoginFailed = true;
      }
    });
  }

}
