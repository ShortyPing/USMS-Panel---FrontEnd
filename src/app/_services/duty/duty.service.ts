import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {DutyDto} from "../../../dto/duty.dto";
import {Constants} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class DutyService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  currentDuty: BehaviorSubject<DutyDto> = new BehaviorSubject<DutyDto>(undefined);
  lastTenDuties: BehaviorSubject<DutyDto[]> = new BehaviorSubject<DutyDto[]>([]);

  public requestCurrentDuty() {
    let token = this.authService.getToken()

    this.http.get<DutyDto>(Constants.backendUrl + "/self/duty/current", {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }).subscribe({
      next: (duty) => this.currentDuty.next(duty),
      error: () => this.currentDuty.next(undefined)
    })

    this.http.get<DutyDto[]>(Constants.backendUrl + "/self/duty", {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    }).subscribe({
      next: (duty) => this.lastTenDuties.next(duty),
      error: () => this.currentDuty.next(undefined)
    })
  }


  public startDuty() {
    let token = this.authService.getToken()

    return this.http.post(Constants.backendUrl + "/self/duty/start", undefined,{
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    });
  }


  public endDuty() {
    let token = this.authService.getToken()

    return this.http.post(Constants.backendUrl + "/self/duty/end", undefined,{
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    });
  }

  public getUnconfirmed() {
    let token = this.authService.getToken()

    return this.http.get<DutyDto[]>(Constants.backendUrl + "/duty/unconfirmed",{
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    });
  }

  public confirm(id: string) {
    let token = this.authService.getToken()

    return this.http.post(Constants.backendUrl + "/duty/confirm/" + id, undefined,{
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
    });
  }
}

