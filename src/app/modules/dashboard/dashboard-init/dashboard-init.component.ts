import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth/auth.service";
import {User} from "../../../../dto/user.dto";
import {ArrestsService} from "../../../_services/arrests/arrests.service";

@Component({
  selector: 'app-dashboard-init',
  templateUrl: './dashboard-init.component.html',
  styleUrls: ['./dashboard-init.component.scss']
})
export class DashboardInitComponent implements OnInit {

  constructor(private authService: AuthService, private arrestService: ArrestsService) { }


  user: User

  ngOnInit(): void {
    this.authService.user.subscribe({
      next: user => this.user = user
    })
  }

  logout() {
    this.authService.logout()
  }

  reload() {
    this.authService.request()
    this.arrestService.requestLastTenArrests()
  }

}
