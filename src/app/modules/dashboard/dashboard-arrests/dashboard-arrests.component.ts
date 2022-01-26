import {Component, OnInit} from '@angular/core';
import {ArrestsService} from "../../../_services/arrests/arrests.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {arrow} from "@popperjs/core";
import {AuthService} from "../../../_services/auth/auth.service";
import {ArrestDto} from "../../../../dto/arrest.dto";

@Component({
  selector: 'app-dashboard-arrests',
  templateUrl: './dashboard-arrests.component.html',
  styleUrls: ['./dashboard-arrests.component.scss']
})
export class DashboardArrestsComponent implements OnInit {

  constructor(private arrestService: ArrestsService, private authService: AuthService) {
  }

  arrestSuccess: string
  arrestError: string
  arrestCount: number
  arrestForm: FormGroup = new FormGroup({
    prisonerName: new FormControl('', Validators.required),
    wing: new FormControl('', Validators.required),
    floorNumber: new FormControl('', Validators.required),
    cellNumber: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    yard: new FormControl('', Validators.required),
    fraction: new FormControl('')
  })

  searchError: string
  searchForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  lastTenArrests: ArrestDto[]
  searchResult: ArrestDto[] = []


  ngOnInit(): void {
    this.arrestService.getNumberOfArrests().subscribe({
      next: (val) => {
        this.arrestCount = val;
      }
    })
    this.arrestService.lastTenArrests.subscribe({
      next: value => {
        this.lastTenArrests = value
      }
    })
    this.arrestService.requestLastTenArrests()

  }


  createArrest() {
    console.log(this.arrestForm.value)
    if (!this.arrestForm.valid) {
      this.arrestError = "Bitte fülle alle Felder aus!"
      return;
    }

    this.arrestService.createArrest(this.arrestForm.value["prisonerName"], this.arrestForm.value["wing"], this.arrestForm.value["time"], this.arrestForm.value["floorNumber"], this.arrestForm.value["cellNumber"], this.arrestForm.value["yard"], this.arrestForm.value["fraction"]).subscribe({
      next: () => {
        this.arrestError = "";
        this.arrestSuccess = "Verhaftung erfolgreich hinzugefügt"
        this.arrestForm.reset()
        this.ngOnInit()
      },
      error: (err) => {
        this.arrestError = `Es ist ein unbekannter Fehler aufgetreten (${err["error"]["statusCode"]})`
        console.log(err)
      }
    })
  }

  search() {
    if (!this.searchForm.valid) {
      this.searchError = "Bitte fülle alle Felder aus!"
      return;
    }

    this.arrestService.search(this.searchForm.value["name"]).subscribe({
      next: (val) => {
        this.searchError = ""
        this.searchResult = val
      }
    })
  }

}
