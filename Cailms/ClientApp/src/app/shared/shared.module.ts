import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { TwoStateButtonComponent } from './components/two-state-button/two-state-button.component';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [ConfirmModalComponent, TwoStateButtonComponent],
    imports: [CommonModule, NzButtonModule, NzDropDownModule, NzIconModule],
    providers: [],
    exports: [
        TwoStateButtonComponent
    ]
})
export class SharedModule { }
