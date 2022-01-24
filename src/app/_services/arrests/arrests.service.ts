import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Constants} from "../../../constants";
import {BehaviorSubject} from "rxjs";
import {ArrestDto} from "../../../dto/arrest.dto";

@Injectable({
  providedIn: 'root'
})
export class ArrestsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public lastTenArrests: BehaviorSubject<ArrestDto[]> = new BehaviorSubject<ArrestDto[]>([]);

  public getNumberOfArrests() {
    return this.http.get<number>(Constants.backendUrl + "/self/arrests/count", {
      headers: new HttpHeaders().set("authorization", `Bearer ${this.authService.getToken()}`)
    });
  }

  public requestLastTenArrests() {
    this.http.get<ArrestDto[]>(Constants.backendUrl + "/arrests", {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`)
    }).subscribe({
      next: value => this.lastTenArrests.next(value)
    })
  }

  public search(name: string) {
    return this.http.get<ArrestDto[]>(Constants.backendUrl + "/arrests/search/" + name, {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.authService.getToken()}`)
    });
  }

  public createArrest(name: string, wing: string, time: number, floor: number, cell: number, yard: boolean, fraction?: string) {
    return this.http.post(Constants.backendUrl + "/self/arrests", {
      prisonerName: name,
      wing: wing,
      floorNumber: floor,
      cellNumber: cell,
      time: time,
      yard: yard,
      fraction: fraction
    }, {
      headers: new HttpHeaders().set("authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public getUnconfirmedArrests() {
    return this.http.get<ArrestDto[]>(Constants.backendUrl + "/arrests/unconfirmed", {
      headers: new HttpHeaders().set("authorization", `Bearer ${this.authService.getToken()}`)
    })
  }

  public verifyArrest(id: string) {
    return this.http.post(Constants.backendUrl + "/arrests/confirm/" + id, undefined, {
      headers: new HttpHeaders().set("authorization", `Bearer ${this.authService.getToken()}`)
    })
  }
}
