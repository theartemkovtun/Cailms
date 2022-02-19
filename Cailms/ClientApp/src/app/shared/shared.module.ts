import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {NzButtonModule} from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, NzButtonModule],
  providers: [],
})
export class SharedModule { }
