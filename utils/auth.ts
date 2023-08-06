import {sign} from "jsonwebtoken"
import {User} from "@/models"

function signToken(user: User) {
  return sign(user, process.env.JWT_SECRET ?? "JWT_SECRET", {
    expiresIn: "30d",
  })
}

export {signToken}
