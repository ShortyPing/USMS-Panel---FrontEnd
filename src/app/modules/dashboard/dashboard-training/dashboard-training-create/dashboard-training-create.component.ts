import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Rank} from "../../../../../dto/rank.dto";
import {TrainingService} from "../../../../_services/training/training.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-training-create',
  templateUrl: './dashboard-training-create.component.html',
  styleUrls: ['./dashboard-training-create.component.scss']
})
export class DashboardTrainingCreateComponent implements OnInit {
  ranks: (Rank | string)[] = Object.values(Rank).filter(value => typeof value === 'string')

  constructor(private trainingService: TrainingService, private router: Router) { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    fromRank: new FormControl('', Validators.required),
    toRank: new FormControl('', Validators.required),
    maximumMembers: new FormControl(10, Validators.required),
    begin: new FormControl("", Validators.required),
  })

  ngOnInit(): void {
  }

  getRankNumber(rank: string | Rank) {
    return Rank[rank]
  }

  getRank(rank: number) {
    return Rank[rank]
  }

  submit() {
    let date = new Date(this.form.value["begin"])
    if(!this.form.valid) {
      return;
    }

    this.trainingService.createTraining(this.form.value["name"], parseInt(this.form.value["fromRank"]), parseInt(this.form.value["toRank"]), this.form.value["maximumMembers"], date).subscribe({
      error: err => console.log(err),
      complete: () => {
        this.router.navigate(['/dashboard/training'])
      }
    })
  }

}
