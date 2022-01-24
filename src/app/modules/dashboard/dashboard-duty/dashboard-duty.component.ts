import {Component, OnInit} from '@angular/core';
import {DutyService} from "../../../_services/duty/duty.service";
import {DutyDto} from "../../../../dto/duty.dto";
import {DatePipe} from "@angular/common";
import {ElectronService} from "../../../core/services";

@Component({
  selector: 'app-dashboard-duty',
  templateUrl: './dashboard-duty.component.html',
  styleUrls: ['./dashboard-duty.component.scss']
})
export class DashboardDutyComponent implements OnInit {

  constructor(private dutyService: DutyService, private datePipe: DatePipe, private electronService: ElectronService) {
  }

  currentDuty?: DutyDto;
  lastTenDuties: Array<DutyDto> = [];

  ngOnInit(): void {
    this.dutyService.requestCurrentDuty()
    this.dutyService.currentDuty.subscribe({
      next: duty => this.currentDuty = duty
    })
    this.dutyService.lastTenDuties.subscribe({
      next: duty => this.lastTenDuties = duty
    })




  }

  startDuty() {
    this.dutyService.startDuty().subscribe({
      next: (res) => {
        this.electronService.ipcRenderer.send("sendAlert", "Schichtbeginn", "Schichtbeginn: " + this.datePipe.transform(res["startTime"], "dd.MM.yyyy HH:mm:ss"));
      },
      complete: () => {
        this.dutyService.requestCurrentDuty()
      }
    })

  }

  endDuty() {
    this.dutyService.endDuty().subscribe({
      next: (res) => {
        let diff = Date.parse(res["endTime"]) - Date.parse(res["startTime"])
        this.electronService.ipcRenderer.send("sendAlert", "Schichtende", "Schicht gestartet: " + this.datePipe.transform(res["startTime"], "dd.MM.yyyy HH:mm:ss") +
          "\r\nSchicht beendet: " + this.datePipe.transform(res["endTime"], "dd.MM.yyyy HH:mm:ss") +
          "\r\nVergangene Zeit: " + this.calcDate(diff))
      },
      complete: () => this.dutyService.requestCurrentDuty()
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
