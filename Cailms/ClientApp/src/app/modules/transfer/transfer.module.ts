import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferCreateComponent } from './containers/transfer-create/transfer-create.component';
import { NzIconModule} from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {NzButtonModule, NzDatePickerModule, NzDividerModule, NzTagModule, NzToolTipModule} from 'ng-zorro-antd';
import { TransfersComponent } from './containers/transfers/transfers.component';
import {TransfersListComponent} from './components/transfers-list/transfers-list.component';
import {TransfersTotalPanelComponent} from './components/transfers-total-panel/transfers-total-panel.component';
import { TransferListItemComponent } from './components/transfer-list-item/transfer-list-item.component';

@NgModule({
  declarations: [
    TransferCreateComponent,
    TransfersComponent,
    TransfersListComponent,
    TransfersTotalPanelComponent,
    TransferListItemComponent],
  exports: [
    TransfersListComponent
  ],
    imports: [
        CommonModule,
        TransferRoutingModule,
        NzIconModule,
        NzInputModule,
        NzCalendarModule,
        NzSelectModule,
        FormsModule,
        NzRadioModule,
        NzInputNumberModule,
        ReactiveFormsModule,
        NzDividerModule,
        NzTagModule,
        NzButtonModule,
        NzToolTipModule,
        NzDatePickerModule,
    ]
})
export class TransferModule { }
