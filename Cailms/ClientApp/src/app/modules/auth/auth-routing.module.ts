import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoLayoutComponent} from '../../_layout/no-layout/no-layout.component';
import {LoginComponent} from './containers/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NoLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
