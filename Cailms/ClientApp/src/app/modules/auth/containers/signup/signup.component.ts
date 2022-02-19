import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isSignupFailed = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordRepeat: [null, [Validators.required]]
    });
  }

  signup = () => {
    this.isSignupFailed = false;
    for (const i in this.signupForm.controls) {
      this.signupForm.controls[i].markAsDirty();
      this.signupForm.controls[i].updateValueAndValidity();
    }

    this.authService.signup(this.signupForm.controls.email.value, this.signupForm.controls.password.value, this.signupForm.controls.passwordRepeat.value).subscribe(isSignedUp => {
      if (isSignedUp) {
        this.router.navigate(['login']);
      }
      else {
        this.isSignupFailed = true;
      }
    });
  }

}
