import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../../../constants";
import {BehaviorSubject, Observable, subscribeOn} from "rxjs";
import {User} from "../../../dto/user.dto";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DutyService} from "../duty/duty.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private titleService: Title, private injector: Injector) {

  }

  user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);


  public getToken() {
    return localStorage.getItem("token")
  }

  public request() {
    this.getAuth().subscribe({
      next: value => {
        this.user.next(value)
        this.titleService.setTitle("United States Marshal Service | Panel (made by ShortPing) » Logged in as: " + value["forename"] + " " + value["lastname"] + " (" + value["username"] + ")")
      },
      error: () => this.logout()
    })
  }

  public getAuth() {
    let token = localStorage.getItem("token");

    return this.http.get<User>(Constants.backendUrl + "/self", {
      headers: new HttpHeaders().set("content-type", "application/json").set("authorization", `Bearer ${token}`)
    })
  }

  public login(username: string, password: string): Observable<Object> {
    return this.http.post(Constants.backendUrl + "/user/login", {
      username: username,
      password: password
    }, {
      headers: new HttpHeaders().set("content-type", "application/json")
    })
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(Constants.backendUrl + "/self/account/password", {
      oldPassword: oldPassword,
      newPassword: newPassword
    }, {
      headers: new HttpHeaders().set("content-type", "application/json").set("authorization", `Bearer ${this.getToken()}`)
    });
  }

  public updateLicenses(car: boolean, truck: boolean, bike: boolean, plane: boolean, weapon: boolean) {
    return this.http.patch(Constants.backendUrl + "/self/account/licenses", {
      car: car,
      truck: truck,
      bike: bike,
      plane: plane,
      weapon: weapon
    }, {
      headers: new HttpHeaders().set("content-type", "application/json").set("authorization", `Bearer ${this.getToken()}`)
    });
  }

  public register(username: string, forename: string, lastname: string, password: string, discordTag: string, steamName: string, carLicense: boolean, bikeLicense: boolean, planeLicense: boolean, weaponLicense: boolean, truckLicense: boolean, registerRank: string, phoneNumber: string) {
    let body = {
      username: username,
      forename: forename,
      lastname: lastname,
      password: password,
      discordTag: discordTag,
      steamName: steamName,
      licenses: {
        car: carLicense,
        bike: bikeLicense,
        plane: planeLicense,
        weapon: weaponLicense,
        truck: truckLicense
      },
      registerRank: parseInt(registerRank),
      phoneNumber: phoneNumber
    }
    console.log(body)
    return this.http.post(Constants.backendUrl + "/user/register", body, {
      headers: new HttpHeaders().set("content-type", "application/json")
    })
  }

  public logout() {
    localStorage.removeItem("token")
    this.user.next(undefined)
    let dutyService = this.injector.get<DutyService>(DutyService);
    dutyService.currentDuty.next(undefined)
    dutyService.lastTenDuties.next([])
     this.router.navigate(['./']) //DISABLED FOR REGISTER FORM DEVELOPMENT
    this.titleService.setTitle("United States Marshal Service | Panel (made by ShortPing)")
  }


  public getUsernameById(id: string) {
    return this.http.get(Constants.backendUrl + "/user/username/" + id, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.getToken()}`)
    })
  }

}
