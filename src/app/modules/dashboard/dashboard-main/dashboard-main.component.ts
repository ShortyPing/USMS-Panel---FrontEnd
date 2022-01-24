import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../dto/user.dto";
import {AuthService} from "../../../_services/auth/auth.service";
import {Rank} from "../../../../dto/rank.dto";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: User
  ngOnInit(): void {
    this.authService.user.subscribe({
      next: value => this.user = value
    })

  }


  getRank(number: number) {
    return Rank[number]
  }

}
