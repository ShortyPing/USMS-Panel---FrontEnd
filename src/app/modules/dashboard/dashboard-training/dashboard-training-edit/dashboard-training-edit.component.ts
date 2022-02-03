import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Training} from "../../../../../dto/training.dto";
import {TrainingService} from "../../../../_services/training/training.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Rank} from "../../../../../dto/rank.dto";

@Component({
  selector: 'app-dashboard-training-edit',
  templateUrl: './dashboard-training-edit.component.html',
  styleUrls: ['./dashboard-training-edit.component.scss']
})
export class DashboardTrainingEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private trainingService: TrainingService, private router: Router) {
  }

  id: string
  training: Training
  success: string = ""
  error: string = ""
  ranks: (Rank | string)[] = Object.values(Rank).filter(value => typeof value === 'string')
  form: FormGroup;

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = value.get("id")
    })
    this.trainingService.getTrainingById(this.id).subscribe({
      next: val => {
        this.training = val
        this.form = new FormGroup({
          name: new FormControl(this.training.name, Validators.required),
          fromRank: new FormControl(this.training.fromRank, Validators.required),
          toRank: new FormControl(this.training.toRank, Validators.required),
          maximumMembers: new FormControl(this.training.maximumMembers, Validators.required),
        })
      }
    })
  }

  submit() {
    if(!this.form.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }

    this.trainingService.editTraining(this.id, {
      name: this.form.value["name"],
      toRank: this.form.value["toRank"],
      fromRank: this.form.value["fromRank"],
      maximumMembers: this.form.value["maximumMembers"],
    }).subscribe({
      complete: ()=> {
        this.router.navigate(['/dashboard/training'])
      },
      error: (err) => {
        this.error = `Ein unbekannter Fehler ist aufgetreten (${err["error"]["statusCode"]})`
        console.log(err)
      }
    })
  }

  getRankNumber(rank: string | Rank) {
    return Rank[rank]
  }

  getRank(rank: number) {
    return Rank[rank]
  }

  removeUser(id: string) {
    this.trainingService.removeMember(this.id, id).subscribe({
      complete: () => this.ngOnInit()
    })
  }

}
