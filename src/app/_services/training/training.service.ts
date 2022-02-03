import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Constants} from "../../../constants";
import {Training} from "../../../dto/training.dto";
import {TrainingEditProperty} from "../../../dto/training-edit.dto";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public editTraining(id: string, data: TrainingEditProperty) {
    return this.http.patch(Constants.backendUrl + "/training?id=" + id, {
      name: data.name,
      toRank: Number(data.toRank),
      fromRank: Number(data.fromRank),
      maximumMembers: data.maximumMembers
    }, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public getAllTrainings() {
    return this.http.get<Training[]>(Constants.backendUrl + "/training", {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    });
  }
  public getTrainingById(id: string) {
    return this.http.get<Training>(Constants.backendUrl + "/training?id=" + id, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    });
  }

  public attendTraining(trainingId: string) {
    return this.http.post(Constants.backendUrl + `/training/attend?id=${trainingId}`, undefined, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public unAttendTraining(trainingId: string) {
    return this.http.post(Constants.backendUrl + `/training/unattend?id=${trainingId}`, undefined, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public removeMember(trainingId: string, member: string) {
    return this.http.delete(Constants.backendUrl + `/training/user?id=${trainingId}&user=${member}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public createTraining(name: string, fromRank: number, toRank: number, maximumMembers: number, begin: Date) {
    return this.http.post(Constants.backendUrl + "/training", {
      name: name,
      fromRank: fromRank,
      toRank: toRank,
      maximumMembers: maximumMembers,
      begin: begin
    }, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")

    })
  }

  public endTraining(id: string) {
    return this.http.delete(Constants.backendUrl + "/training?id=" + id, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public startTraining(id: string) {
    return this.http.post(Constants.backendUrl + "/training/start?id=" + id, undefined,{
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }

  public stopTraining(id: string) {
    return this.http.post(Constants.backendUrl + "/training/stop?id=" + id, undefined,{
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`).set("Content-Type", "application/json")
    })
  }
}
