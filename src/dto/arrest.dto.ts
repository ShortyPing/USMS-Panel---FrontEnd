export class ArrestDto {
  _id:                string
  prisonerName:       string
  warden:             string
  wing:               string
  floorNumber:        number
  cellNumber:         number
  time:               number
  confirmed:          boolean
  timeCreated:        Date
  yard:               boolean
  fraction?:          string
}
