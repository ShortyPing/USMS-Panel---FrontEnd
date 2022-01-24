import {License} from "./license.dto";
import {Rank} from "./rank.dto";

export class User {

  _id: string

  username: string

  forename: string

  lastname: string

  password: string

  rank: Rank

  dutyNumber: number

  discordTag: string

  steamName: string

  phoneNumber: string

  licenses: {
    car: boolean,
    bike: boolean,
    plane: boolean,
    weapon: boolean,
    truck: boolean
  }

  registerRank: Rank

  points: number

  timeCreated: Date

  terminated: boolean

  specialPermissions: {
    ausbilder: boolean,
    personalabteilung: boolean,
    leitung: boolean
  }
}
