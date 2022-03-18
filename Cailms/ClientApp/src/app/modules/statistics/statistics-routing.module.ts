import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticsComponent} from './containers/statistics/statistics.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {LeftSiderLayoutComponent} from '../../_layout/left-sider-layout/left-sider-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LeftSiderLayoutComponent,
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent
      }
    ],
  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
