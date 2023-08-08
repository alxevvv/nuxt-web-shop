import {hash} from "argon2"
import {omit} from "lodash"
import {useSanityClient} from "@/composables"
import {User} from "@/models"
import {signToken, checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  const user = checkAuthorizationHeader(event)

  const sanity = useSanityClient()

  const body = await readBody(event)

  const updatePayload: Partial<User> = {
    name: body.name,
    email: body.email,
  }

  if (body.password) {
    updatePayload.password = await hash(body.password)
  }

  const mutationsResult = await sanity.mutate(
    [
      {
        patch: {
          id: user._id,
          set: updatePayload,
        },
      },
    ],
    {
      returnDocuments: true,
    }
  )

  const updatedUser = mutationsResult[0] as User

  const token = signToken(updatedUser)

  return {
    ...omit(updatedUser, "password"),
    token,
  }
})
