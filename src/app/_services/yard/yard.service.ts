import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {YardEntryDto} from "../../../dto/yard-entry.dto";
import {Constants} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class YardService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getLastTenYardEntries() {
    return this.http.get<YardEntryDto[]>(Constants.backendUrl + "/yard", {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    });
  }

  public createYardEntry(prisonerName: string, time: number) {
    return this.http.post(Constants.backendUrl + "/yard", {
      prisonerName: prisonerName,
      time: time
    }, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    })
  }
}
