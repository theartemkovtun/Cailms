import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticsComponent} from './containers/statistics/statistics.component';
import {HeaderLayoutComponent} from '../../_layout/header-layout/header-layout.component';
import {AuthGuard} from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HeaderLayoutComponent,
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
