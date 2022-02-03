import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardInitComponent} from "./dashboard-init/dashboard-init.component";
import {DashboardMainComponent} from "./dashboard-main/dashboard-main.component";
import {DashboardDutyComponent} from "./dashboard-duty/dashboard-duty.component";
import {DashboardProfileComponent} from "./dashboard-profile/dashboard-profile.component";
import {DashboardArrestsComponent} from "./dashboard-arrests/dashboard-arrests.component";
import {DashboardPersonalabteilungComponent} from "./dashboard-personalabteilung/dashboard-personalabteilung.component";
import {PersonalabteilungGuard} from "../../_guards/specialPermission/personalabteilung.guard";
import {DashboardYardComponent} from "./dashboard-yard/dashboard-yard.component";
import {
  DashboardPersonalabteilungEditComponent
} from "./dashboard-personalabteilung/dashboard-personalabteilung-edit/dashboard-personalabteilung-edit.component";
import {DashboardTrainingComponent} from "./dashboard-training/dashboard-training.component";
import {AusbilderGuard} from "../../_guards/specialPermission/ausbilder.guard";
import {
  DashboardTrainingEditComponent
} from "./dashboard-training/dashboard-training-edit/dashboard-training-edit.component";
import {
  DashboardTrainingCreateComponent
} from "./dashboard-training/dashboard-training-create/dashboard-training-create.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardInitComponent,
    children: [
      {
        path: "",
        component: DashboardMainComponent
      },
      {
        path: "duty",
        component: DashboardDutyComponent
      },
      {
        path: "profile",
        component: DashboardProfileComponent
      },
      {
        path: "arrests",
        component: DashboardArrestsComponent
      },
      {
        path: "personalabteilung",
        component: DashboardPersonalabteilungComponent,
        canActivate: [PersonalabteilungGuard],
      },
      {
        path: "personalabteilung/edit/:id",
        component: DashboardPersonalabteilungEditComponent,
        canActivate: [PersonalabteilungGuard]
      },
      {
        path: "yard",
        component: DashboardYardComponent
      },
      {
        path: "training",
        component: DashboardTrainingComponent,
        canActivate: [AusbilderGuard]
      },
      {
        path: "training/edit/:id",
        component: DashboardTrainingEditComponent,
        canActivate: [AusbilderGuard]
      },
      {
        path: "training/create",
        component: DashboardTrainingCreateComponent,
        canActivate: [AusbilderGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
