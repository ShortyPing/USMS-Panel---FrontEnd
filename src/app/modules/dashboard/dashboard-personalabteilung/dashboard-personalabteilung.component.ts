import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../_services/user/user.service";
import {User} from "../../../../dto/user.dto";
import {Rank} from "../../../../dto/rank.dto";
import {ArrestDto} from "../../../../dto/arrest.dto";
import {ArrestsService} from "../../../_services/arrests/arrests.service";
import {DutyDto} from "../../../../dto/duty.dto";
import {DutyService} from "../../../_services/duty/duty.service";

@Component({
  selector: 'app-dashboard-personalabteilung',
  templateUrl: './dashboard-personalabteilung.component.html',
  styleUrls: ['./dashboard-personalabteilung.component.scss']
})
export class DashboardPersonalabteilungComponent implements OnInit {

  constructor(private userService: UserService, private arrestsService: ArrestsService, private dutyService: DutyService) {
  }


  currentPage: number = 0;
  users: User[]
  terminatedUsers: User[]
  showTerminatedUsers: boolean = false
  notVerifiedUsers: User[]
  unconfirmedArrests: ArrestDto[] =  []
  unverifiedDuties: DutyDto[] = []
  ngOnInit(): void {
    this.users = []
    this.terminatedUsers = []
    this.userService.getUsers(0).subscribe({
      next: (users) => {
        console.log(users)
        if (users.length == 0) {
          return;
        }
        this.users = users;
      }
    })


    this.dutyService.getUnconfirmed().subscribe({
      next: val => this.unverifiedDuties = val
    })

    this.userService.getTerminatedUsers().subscribe({
      next: (users) => {
        this.terminatedUsers = users;
      }
    })
    this.userService.getNotVerifiedUsers().subscribe({
      next: (users) => this.notVerifiedUsers = users
    })

    this.arrestsService.getUnconfirmedArrests().subscribe({
      next: val => this.unconfirmedArrests = val
    })
  }

  getRank(number: number) {
    return Rank[number]
  }

  verifyUser(id: string) {
    this.userService.verifyUser(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }

  rejectVerifyUser(id: string) {
    this.userService.rejectUserVerification(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }

  unterminateUser(id: string) {
    this.userService.unTerminateUser(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }
  confirmArrest(id: string) {
    this.arrestsService.verifyArrest(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }


  nextPage() {
    this.userService.getUsers(this.currentPage + 1).subscribe({
      next: (users) => {
        console.log(users)
        if (users.length == 0) {
          return;
        }
        this.users = users;
        this.currentPage++
      }
    })

  }

  terminateUser(id: string) {
    this.userService.terminateUser(id).subscribe({
      complete: () => {
        this.ngOnInit()

      }
    })
  }

  previousPage() {
    if (this.currentPage == 0) return;

    this.userService.getUsers(this.currentPage - 1).subscribe({
      next: (users) => {
        this.users = users;
      }
    })
    this.currentPage--;
  }

  confirmDuty(id: string) {
    this.dutyService.confirm(id).subscribe({
      complete: () => {
        this.ngOnInit()
      }
    })
  }

  calcDateDuty(duty: DutyDto) {
    return this.calcDate(Date.parse(String(duty.endTime)) - Date.parse(String(duty.startTime)))
  }


  calcDate(time) {
    let seconds = time / 1000;
    let days = 0;
    let hours = 0;
    let minutes = 0;

    for (minutes = 0; seconds >= 60; minutes++) {
      seconds -= 60;
    }

    for (hours = 0; minutes >= 60; hours++) {
      minutes -= 60;
    }

    for (days = 0; hours >= 24; days++) {
      hours -= 24;
    }

    seconds = Math.round(seconds)
    days = Math.round(days)
    hours = Math.round(hours)
    minutes = Math.round(minutes)

    return `${days} Tage ${hours} Stunden ${minutes} Minuten`

  }

}
