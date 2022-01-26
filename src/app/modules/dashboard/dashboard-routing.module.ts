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
        canActivate: [PersonalabteilungGuard]
      },
      {
        path: "yard",
        component: DashboardYardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
