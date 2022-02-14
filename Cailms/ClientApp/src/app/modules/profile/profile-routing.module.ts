import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderLayoutComponent} from '../../_layout/header-layout/header-layout.component';
import {UserProfileComponent} from './containers/user-profile/user-profile.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {LeftSiderLayoutComponent} from '../../_layout/left-sider-layout/left-sider-layout.component';

const routes: Routes = [  {
  path: '',
  component: LeftSiderLayoutComponent,
  children: [
    {
      path: 'profile',
      component: UserProfileComponent
    }
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
