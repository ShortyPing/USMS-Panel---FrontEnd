import {Rank} from "./rank.dto";

export class Training {
  _id: string
  name: string
  fromRank: Rank
  toRank: Rank
  createdBy: string
  members: string[]
  maximumMembers: number
  createdOn: Date
  begin: Date
  isStarted: boolean


}
