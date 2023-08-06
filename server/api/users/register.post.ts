import {hash} from "argon2"
import {omit} from "lodash"
import {useSanityClient} from "@/composables"
import {User} from "@/models"
import {signToken} from "@/utils"

export default defineEventHandler(async (event) => {
  const sanity = useSanityClient()

  const body = await readBody(event)
  const passwordHash = await hash(body.password)

  const user = (await sanity.create(
    {
      _type: "user",
      name: body.name,
      email: body.email,
      password: passwordHash,
      isAdmin: false,
    },
    {
      returnDocuments: true,
    }
  )) as User

  const token = signToken(user)

  return {
    ...omit(user, "password"),
    token,
  }
})
