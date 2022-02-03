import { Component, OnInit } from '@angular/core';
import {Training} from "../../../../dto/training.dto";
import {TrainingService} from "../../../_services/training/training.service";
import {Rank} from "../../../../dto/rank.dto";
import {Router} from "@angular/router";
import {User} from "../../../../dto/user.dto";
import {AuthService} from "../../../_services/auth/auth.service";

@Component({
  selector: 'app-dashboard-training',
  templateUrl: './dashboard-training.component.html',
  styleUrls: ['./dashboard-training.component.scss']
})
export class DashboardTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService, private router: Router, private authService: AuthService) { }

  trainings: Training[] = []
  user: User

  ngOnInit(): void {
    this.trainingService.getAllTrainings().subscribe({
      next: val => this.trainings = val
    })
    this.authService.getAuth().subscribe({
      next: user => this.user = user
    })
  }

  getRank(rank: number) {
    return Rank[rank]
  }

  editTraining(id: string) {
    this.router.navigate(['/dashboard/training/edit/' + id])
  }

  endTraining(id: string) {
    this.trainingService.endTraining(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }

  startTraining(id: string) {
    this.trainingService.startTraining(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }

  stopTraining(id: string) {
    this.trainingService.stopTraining(id).subscribe({
      complete: () => this.ngOnInit()
    })
  }
}
