import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoLayoutComponent} from '../../_layout/no-layout/no-layout.component';
import {LoginComponent} from './containers/login/login.component';
import {SignupComponent} from './containers/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: NoLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
