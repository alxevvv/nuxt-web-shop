import {Model} from "./internals"

export interface User extends Model<"user"> {
  name: string
  email: string
  password: string
  isAdmin: boolean
}
