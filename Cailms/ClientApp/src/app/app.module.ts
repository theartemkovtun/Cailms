import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderLayoutComponent } from './_layout/header-layout/header-layout.component';
import { NoLayoutComponent } from './_layout/no-layout/no-layout.component';
import {AuthModule} from './modules/auth/auth.module';
import {StatisticsModule} from './modules/statistics/statistics.module';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {TransferModule} from './modules/transfer/transfer.module';
import {ProfileModule} from './modules/profile/profile.module';
import { LeftSiderLayoutComponent } from './_layout/left-sider-layout/left-sider-layout.component';
import {SharedModule} from './shared/shared.module';
import {JobsModule} from './modules/jobs/jobs.module';
import {ComparisonModule} from './modules/comparison/comparison.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    NoLayoutComponent,
    LeftSiderLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    StatisticsModule,
    TransferModule,
    ProfileModule,
    SharedModule,
    JobsModule,
    ComparisonModule,
    NzAvatarModule,
    NzIconModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
