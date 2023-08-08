import {q} from "groqd"
import {useSanityClient} from "@/composables"
import {Order} from "@/models"
import {checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  const user = checkAuthorizationHeader(event)

  const sanity = useSanityClient()

  const {query} = q("*").filter("_type == 'order' && user._ref == $userId")

  return await sanity.fetch<Order[]>(query, {userId: user._id})
})
