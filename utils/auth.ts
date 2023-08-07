import {H3Event} from "h3"
import {sign, verify} from "jsonwebtoken"
import {User} from "@/models"

function signToken(user: User) {
  return sign(user, process.env.JWT_SECRET ?? "JWT_SECRET", {
    expiresIn: "30d",
  })
}

function checkAuthorizationHeader(event: H3Event) {
  const authorization = getHeader(event, "authorization")?.split("Bearer ")[1]

  if (!authorization) {
    throw createError({
      statusCode: 401,
      message: "Authorization token missed",
      fatal: true,
    })
  }

  try {
    return verify(authorization, process.env.JWT_SECRET ?? "JWT_SECRET") as User
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Invalid authorization token",
      fatal: true,
    })
  }
}

export {checkAuthorizationHeader, signToken}
