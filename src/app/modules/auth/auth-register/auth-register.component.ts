import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Rank} from "../../../../dto/rank.dto";
import {AuthService} from "../../../_services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  error: string
  success: boolean
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    forename: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    discordtag: new FormControl('', Validators.required),
    steamname: new FormControl('', Validators.required),
    carlicense: new FormControl(false, Validators.required),
    planelicense: new FormControl(false, Validators.required),
    weaponlicense: new FormControl(false, Validators.required),
    trucklicense: new FormControl(false, Validators.required),
    bikelicense: new FormControl(false, Validators.required),
    phonenumber: new FormControl('', Validators.required),
    rank: new FormControl('', Validators.required)
  })

  availableRanksForRegister = [
    {
      name: "Deputy U.S. Marshal I",
      rankId: Rank["Deputy US Marshal I"]
    },
    {
      name: "Deputy U.S. Marshal II",
      rankId: Rank["Deputy US Marshal II"]
    },
    {
      name: "Deputy U.S. Marshal III",
      rankId: Rank["Deputy US Marshal III"]
    },
    {
      name: "Deputy U.S. Marshal IV",
      rankId: Rank["Deputy US Marshal IV"]
    },
    {
      name: "Deputy U.S. Marshal V",
      rankId: Rank["Deputy US Marshal V"]
    },
    {
      name: "Super Deputy US Marshal",
      rankId: Rank["Super Deputy US Marshal"]
    },
    {
      name: "Detective US Marshal",
      rankId: Rank["Detective US Marshal"]
    },
    {
      name: "Sergeant",
      rankId: Rank.Sergeant
    },
    {
      name: "Staff Sergeant",
      rankId: Rank["Staff Sergeant"]
    },
    {
      name: "Drill Sergeant",
      rankId: Rank["Drill Sergeant"]
    },
    {
      name: "Commander",
      rankId: Rank["Commander"]
    },
    {
      name: "Lieutenant",
      rankId: Rank["Lieutenant"]
    },
    {
      name: "Lieutenant Commander",
      rankId: Rank["Lieutenant Commander"]
    },

  ]

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value)
    if(!this.registerForm.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }
    this.error = ""
    const values = this.registerForm.value;
    this.authService.register(values["username"],
      values["forename"], values["lastname"],
      values["password"],
      values["discordtag"],
      values["steamname"],
      values["carlicense"],
      values["bikelicense"],
      values["planelicense"],
      values["weaponlicense"],
      values["trucklicense"],
      values["rank"],
      values["phonenumber"]
    ).subscribe({
      next: (value) => {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['./'])
        }, 1000*5)
      },
      error: err => {
        console.log(err)
        if(err["error"]["statusCode"] == 409) {
          this.error = "Dieser Benutzer existiert bereits!"
          return;
        }


        this.error = "Ein unbekannter Fehler ist aufgetreten."
      }
    })

  }

}
