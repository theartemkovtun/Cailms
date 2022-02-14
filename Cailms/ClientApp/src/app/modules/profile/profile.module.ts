import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class ProfileModule { }
