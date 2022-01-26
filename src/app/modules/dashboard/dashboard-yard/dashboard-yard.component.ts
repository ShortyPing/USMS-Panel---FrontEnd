import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {YardEntryDto} from "../../../../dto/yard-entry.dto";
import {YardService} from "../../../_services/yard/yard.service";

@Component({
  selector: 'app-dashboard-yard',
  templateUrl: './dashboard-yard.component.html',
  styleUrls: ['./dashboard-yard.component.scss']
})
export class DashboardYardComponent implements OnInit {

  constructor(private yardService: YardService) {
  }

  yardEntries: YardEntryDto[] = []
  error: string
  success: string

  ngOnInit(): void {
    this.yardService.getLastTenYardEntries().subscribe({
      next: val => this.yardEntries = val
    })
  }

  yardEntryForm: FormGroup = new FormGroup({
    prisonerName: new FormControl('', Validators.required),
    time: new FormControl(undefined, Validators.required)
  })


  createEntry() {
    this.success = ""
    this.error = ""
    if (!this.yardEntryForm.valid) {
      this.error = "Bitte fülle alle Felder aus!"
      return;
    }

    this.yardService.createYardEntry(this.yardEntryForm.value["prisonerName"], this.yardEntryForm.value["time"]).subscribe({
      next: () => {
        this.error = ""
        this.success = "Hofgang erfolgreich eingetragen."
        this.yardEntryForm.reset()

      },
      error: (err) => {
        this.error = `Ein unbekannter Fehler ist aufgetreten (${err["error"]["statusCode"]})`
        console.log(err)
        return;
      },
      complete: () => {
        this.ngOnInit()

      }
    })
  }


}
