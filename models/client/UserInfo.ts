import {User} from "@/models"

interface UserInfo extends Omit<User, "password"> {
  token: string
}

export type {UserInfo}
