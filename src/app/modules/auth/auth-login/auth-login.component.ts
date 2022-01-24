import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  success: boolean = false
  error: string;
  info: string;

  ngOnInit(): void {
    this.authService.getAuth().subscribe({
      next: () => {
        this.info = "Login gefunden! Du wirst in ein paar Sekunden automatisch eingeloggt."
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 1000)
      }
    })
  }


  login() {
    if(!this.loginForm.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }

    this.authService.login(this.loginForm.value["username"], this.loginForm.value["password"])
      .subscribe({
        next: (value) => {
          localStorage.setItem("token", value["token"])
          this.success = true
          this.error = undefined;
          this.authService.request()
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 500)
        },
        error: (err) => {
          if(err["error"]["message"] == "terminated") {
            this.error = "Du wurdest gekündigt! Wenn dies ein Fehler sein sollte, wende dich bitte an die Leitung!"
            return;
          }

          if(err["error"]["message"] == "not-verified") {
            this.error = "Du bist noch nicht verifiziert! Bitte warte bis die Personalabteilung deine Registrierung annimmt."
            return;
          }

          if(err["error"]["statusCode"] == 401) {
            this.error = "Benutzername oder Passwort ist falsch!"
            return;
          }

          this.error = "Ein unbekannter Fehler ist aufgetreten."
        }
      })
  }

}
