import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeftSiderLayoutComponent} from '../../_layout/left-sider-layout/left-sider-layout.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {ComparisonComponent} from './containers/comparison/comparison.component';

const routes: Routes = [
  {
    path: '',
    component: LeftSiderLayoutComponent,
    children: [
      {
        path: 'comparison',
        component: ComparisonComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparisonRoutingModule { }
