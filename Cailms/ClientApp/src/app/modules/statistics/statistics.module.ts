import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './containers/statistics/statistics.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzListModule} from 'ng-zorro-antd/list';
import {ChartModule} from 'primeng/chart';
import {CategoryLabelComponent} from './components/category-label/category-label.component';
import { MonthYearPickerComponent } from './components/month-year-picker/month-year-picker.component';
import { BackgroundSectionComponent } from './components/background-section/background-section.component';
import { TotalIncomeOutcomeComponent } from './components/total-income-outcome/total-income-outcome.component';
import { CategoriesOutcomeComponent } from './components/categories-outcome/categories-outcome.component';
import { PeriodIncomeOutcomeBarChartComponent } from './components/period-income-outcome-bar-chart/period-income-outcome-bar-chart.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {NzDividerModule} from 'ng-zorro-antd';
import {TransferModule} from '../transfer/transfer.module';

@NgModule({
  declarations: [
    StatisticsComponent,
    CategoryLabelComponent,
    MonthYearPickerComponent,
    BackgroundSectionComponent,
    TotalIncomeOutcomeComponent,
    CategoriesOutcomeComponent,
    PeriodIncomeOutcomeBarChartComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NzIconModule,
    NzAvatarModule,
    NzButtonModule,
    NzListModule,
    ChartModule,
    NzTagModule,
    NzDividerModule,
    TransferModule
  ]
})
export class StatisticsModule { }
