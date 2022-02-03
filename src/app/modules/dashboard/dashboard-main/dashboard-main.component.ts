import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../dto/user.dto";
import {AuthService} from "../../../_services/auth/auth.service";
import {Rank} from "../../../../dto/rank.dto";
import {Training} from "../../../../dto/training.dto";
import {TrainingService} from "../../../_services/training/training.service";

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  constructor(private authService: AuthService, private trainingService: TrainingService) { }
  user: User
  trainings: Training[] = []
  ngOnInit(): void {
    this.authService.user.subscribe({
      next: value => this.user = value
    })
    this.updateTrainings()

  }

  updateTrainings() {
    this.trainingService.getAllTrainings().subscribe({
      next: val => this.trainings = val
    })
  }

  getRank(number: number) {
    return Rank[number]
  }

  attendTraining(id: string) {
    this.trainingService.attendTraining(id).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this.updateTrainings()
      }
    })
  }
  unAttendTraining(id: string) {
    this.trainingService.unAttendTraining(id).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this.updateTrainings()
      }
    })
  }
}
