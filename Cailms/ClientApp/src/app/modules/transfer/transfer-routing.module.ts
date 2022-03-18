import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransferCreateComponent} from './containers/transfer-create/transfer-create.component';
import {TransfersComponent} from './containers/transfers/transfers.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {LeftSiderLayoutComponent} from '../../_layout/left-sider-layout/left-sider-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LeftSiderLayoutComponent,
    children: [
      {
        path: 'transfer',
        component: TransferCreateComponent
      },
      {
        path: 'transfers',
        component: TransfersComponent
      },
      {
        path: 'transfer/:transferId',
        component: TransferCreateComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
