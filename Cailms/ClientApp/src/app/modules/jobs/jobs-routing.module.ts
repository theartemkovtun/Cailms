import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeftSiderLayoutComponent} from '../../_layout/left-sider-layout/left-sider-layout.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {JobsListComponent} from './containers/jobs-list/jobs-list.component';
import {JobCreateEditComponent} from './containers/job-create-edit/job-create-edit.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: LeftSiderLayoutComponent,
    children: [
      {
        path: '',
        component: JobsListComponent
      },
      {
        path: 'new',
        component: JobCreateEditComponent
      },
      {
        path: ':jobId',
        component: JobCreateEditComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
