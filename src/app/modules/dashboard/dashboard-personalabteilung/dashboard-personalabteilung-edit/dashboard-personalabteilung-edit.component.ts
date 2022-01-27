import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../../dto/user.dto";
import {UserService} from "../../../../_services/user/user.service";
import {AuthService} from "../../../../_services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Rank} from "../../../../../dto/rank.dto";

@Component({
  selector: 'app-dashboard-personalabteilung-edit',
  templateUrl: './dashboard-personalabteilung-edit.component.html',
  styleUrls: ['./dashboard-personalabteilung-edit.component.scss']
})
export class DashboardPersonalabteilungEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router) {
  }

  id: string
  user: User
  ranks: (Rank | string)[] = Object.values(Rank).filter(value => typeof value === 'string')
  error: string
  success: string

  form: FormGroup

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: route => {
        this.id = route.get("id")
        this.userService.getUserById(this.id).subscribe({
          next: user => {
            this.user = user
            this.form = new FormGroup({
              username: new FormControl(this.user.username, Validators.required),
              forename: new FormControl(this.user.forename, Validators.required),
              lastname: new FormControl(this.user.lastname, Validators.required),
              rank: new FormControl(this.user.rank, Validators.required),
              dutyNumber: new FormControl(this.user.dutyNumber, Validators.required),
              discordTag: new FormControl(this.user.discordTag, Validators.required),
              steamName: new FormControl(this.user.steamName, Validators.required),
              phoneNumber: new FormControl(this.user.phoneNumber, Validators.required),
              car: new FormControl(this.user.licenses.car),
              truck: new FormControl(this.user.licenses.truck),
              plane: new FormControl(this.user.licenses.plane),
              bike: new FormControl(this.user.licenses.bike),
              weapon: new FormControl(this.user.licenses.weapon),
              points: new FormControl(this.user.points, Validators.required)
            })
          },
          error: () => this.router.navigate(['/dashboard/personalabteilung'])
        })
      }
    })
  }

  submit() {
    if(!this.form.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }

    this.userService.editUser(this.id, {
      username: this.form.value["username"],
      forename: this.form.value["forename"],
      lastname: this.form.value["lastname"],
      rank: this.form.value["rank"],
      dutyNumber: this.form.value["dutyNumber"],
      discordTag: this.form.value["discordTag"],
      steamName: this.form.value["steamName"],
      phoneNumber: this.form.value["phoneNumber"],
      licenses: {
        car: this.form.value["car"],
        bike: this.form.value["bike"],
        plane: this.form.value["plane"],
        weapon: this.form.value["weapon"],
        truck: this.form.value["truck"],
      },
      points: this.form.value["points"]
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/personalabteilung'])
      },
      error: (err) => {
        this.error = "Ein Fehler ist aufgetreten. Bitte überprüfe ob der Benutzername oder die Dienstnummer bereits belegt sind"
        console.log(err)
      }
    })
  }

  getRankNumber(rank: string | Rank) {
    return Rank[rank]
  }

}
