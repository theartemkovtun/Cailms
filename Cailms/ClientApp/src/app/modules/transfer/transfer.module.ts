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
import { TransfersComponent } from './containers/transfers/transfers.component';
import {TransfersListComponent} from './components/transfers-list/transfers-list.component';
import {TransfersTotalPanelComponent} from './components/transfers-total-panel/transfers-total-panel.component';
import { TransferListItemComponent } from './components/transfer-list-item/transfer-list-item.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';

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
    NzBadgeModule,
    NzDropDownModule,
    NzNoAnimationModule,
  ]
})
export class TransferModule { }
