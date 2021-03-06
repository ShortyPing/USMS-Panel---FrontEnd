import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Constants} from "../../../constants";
import {User} from "../../../dto/user.dto";
import {UserEditProperty} from "../../../dto/user-edit.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getUsers(page: number) {
    return this.http.get<User[]>(Constants.backendUrl + "/user/active?page=" + page, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    });
  }

  public getTerminatedUsers() {
    return this.http.get<User[]>(Constants.backendUrl + "/user/terminated", {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public getUserById(id: string) {
    return this.http.get<User>(Constants.backendUrl + "/user/id/" + id, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public editUser(id: string, data: UserEditProperty) {
    return this.http.put(Constants.backendUrl + "/user/" + id, {
      username: data.username,
      forename: data.forename,
      lastname: data.lastname,
      rank: data.rank,
      dutyNumber: data.dutyNumber,
      discordTag: data.discordTag,
      steamName: data.steamName,
      phoneNumber: data.phoneNumber,
      licenses: {
        car: data.licenses.car,
        truck: data.licenses.truck,
        plane: data.licenses.plane,
        bike: data.licenses.bike,
        weapon: data.licenses.weapon
      },
      points: data.points
    }, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public getNotVerifiedUsers() {
    return this.http.get<User[]>(Constants.backendUrl + "/user/not-activated", {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public terminateUser(id: string) {
    return this.http.post(Constants.backendUrl + "/user/terminate/" + id, undefined, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public unTerminateUser(id: string) {
    return this.http.post(Constants.backendUrl + "/user/unterminate/" + id, undefined, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }


  public verifyUser(id: string) {
    return this.http.post(Constants.backendUrl + "/user/" + id + "/verification/accept", undefined, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public rejectUserVerification(id: string) {
    return this.http.post(Constants.backendUrl + "/user/" + id + "/verification/reject", undefined, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

}
