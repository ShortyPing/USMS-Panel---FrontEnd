import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";
import {User} from "../../../../dto/user.dto";

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  error: string
  success: string

  successLicense: string
  errorLicense: string

  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    repeatNewPassword: new FormControl('', Validators.required)
  })

  licenseForm: FormGroup

  user: User

  ngOnInit(): void {
    this.authService.user.subscribe({
      next: user => this.user = user
    })
    this.licenseForm = new FormGroup({
      carLicense: new FormControl(this.user.licenses.car),
      truckLicense: new FormControl(this.user.licenses.truck),
      bikeLicense: new FormControl(this.user.licenses.bike),
      planeLicense: new FormControl(this.user.licenses.plane),
      weaponLicense: new FormControl(this.user.licenses.weapon)
    })
  }

  changeLicenses() {
    this.authService.updateLicenses(
      this.licenseForm.value["carLicense"],
      this.licenseForm.value["truckLicense"],
      this.licenseForm.value["bikeLicense"],
      this.licenseForm.value["planeLicense"],
      this.licenseForm.value["weaponLicense"],
    ).subscribe({
      next: () => this.successLicense = "Lizenzen erfolgreich aktualisiert",
      error: (err) => this.errorLicense = "Ein unbekannter Fehler ist aufgetreten (" + err["error"]["statusCode"] + ")",
      complete: () => this.authService.request()
    })
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }

    if (this.changePasswordForm.value["newPassword"] != this.changePasswordForm.value["repeatNewPassword"]) {
      this.error = "Password falsch wiederholt!"
      return;
    }

    this.error = "";

    this.authService.changePassword(this.changePasswordForm.value["oldPassword"], this.changePasswordForm.value["newPassword"])
      .subscribe({
        next: () => {
          this.success = "Passwort erfolgreich geändert."
          this.changePasswordForm.reset()
        },
        error: (err) => {
          if (err["error"]["statusCode"] == 403) {
            this.error = "Aktuelles Passwort stimmt nicht überein."
            return;
          }

          this.error = "Ein unbekannter Fehler ist aufgetreten (" + err["error"]["statusCode"] + ")"
        }
      })
  }

}
