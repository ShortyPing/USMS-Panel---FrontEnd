import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardInitComponent} from './dashboard-init/dashboard-init.component';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {DashboardDutyComponent} from './dashboard-duty/dashboard-duty.component';
import {DashboardProfileComponent} from './dashboard-profile/dashboard-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardArrestsComponent} from './dashboard-arrests/dashboard-arrests.component';
import {AppModule} from "../../app.module";
import {UsernamePipe} from "../../_pipes/username.pipe";
import {WingPipe} from "../../_pipes/wing.pipe";
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import { DashboardPersonalabteilungComponent } from './dashboard-personalabteilung/dashboard-personalabteilung.component';
import { DashboardYardComponent } from './dashboard-yard/dashboard-yard.component';
import { DashboardPersonalabteilungEditComponent } from './dashboard-personalabteilung/dashboard-personalabteilung-edit/dashboard-personalabteilung-edit.component';
import { DashboardTrainingComponent } from './dashboard-training/dashboard-training.component';
import { DashboardTrainingEditComponent } from './dashboard-training/dashboard-training-edit/dashboard-training-edit.component';
import { DashboardTrainingCreateComponent } from './dashboard-training/dashboard-training-create/dashboard-training-create.component';


@NgModule({
  declarations: [
    DashboardInitComponent,
    DashboardMainComponent,
    DashboardDutyComponent,
    DashboardProfileComponent,
    DashboardArrestsComponent,
    UsernamePipe,
    WingPipe,
    DashboardPersonalabteilungComponent,
    DashboardYardComponent,
    DashboardPersonalabteilungEditComponent,
    DashboardTrainingComponent,
    DashboardTrainingEditComponent,
    DashboardTrainingCreateComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  exports: [DatePipe],
  providers: [DatePipe, CdkVirtualScrollViewport]
})
export class DashboardModule {
}
