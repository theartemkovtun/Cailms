import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparisonRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './containers/comparison/comparison.component';
import { ValuesLineCompareComponent } from './components/values-line-compare/values-line-compare.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [ComparisonComponent, ValuesLineCompareComponent],
    imports: [
        CommonModule,
        ComparisonRoutingModule,
        ChartModule
    ]
})
export class ComparisonModule { }
