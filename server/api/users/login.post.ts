import {verify} from "argon2"
import {q} from "groqd"
import {omit} from "lodash"
import {useSanityClient} from "@/composables"
import {User} from "@/models"
import {signToken} from "@/utils"

export default defineEventHandler(async (event) => {
  const sanity = useSanityClient()

  const body = await readBody(event)

  const {query} = q("*").filter("_type == 'user' && email == $email").slice(0)

  const user = await sanity.fetch<User | null>(query, {email: body.email})

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
      fatal: true,
    })
  }

  const isPasswordValid = await verify(user.password, body.password)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
      fatal: true,
    })
  }

  const token = signToken(user)

  return {
    ...omit(user, "password"),
    token,
  }
})
