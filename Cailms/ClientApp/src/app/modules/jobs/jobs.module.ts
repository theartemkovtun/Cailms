import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './containers/jobs-list/jobs-list.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { JobCreateEditComponent } from './containers/job-create-edit/job-create-edit.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import {TransferModule} from '../transfer/transfer.module';
import {SharedModule} from '../../shared/shared.module';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { DayPickerComponent } from './components/day-picker/day-picker.component';
import { JobPreviewComponent } from './components/job-preview/job-preview.component';
import { JobListItemComponent } from './components/job-list-item/job-list-item.component';
import { JobsFiltersComponent } from './components/jobs-filters/jobs-filters.component';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [JobsListComponent, JobCreateEditComponent, DayPickerComponent, JobPreviewComponent, JobListItemComponent, JobsFiltersComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzStepsModule,
    TransferModule,
    SharedModule,
    NzTagModule,
    NzRadioModule,
    NzToolTipModule,
    NzSwitchModule,
    FormsModule
  ]
})
export class JobsModule { }
