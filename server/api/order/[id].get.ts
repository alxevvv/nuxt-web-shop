import {q} from "groqd"
import {useSanityClient} from "@/composables"
import {Order} from "@/models"
import {checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  const user = checkAuthorizationHeader(event)

  const sanity = useSanityClient()
  const orderId = event.context.params?.id

  const {query} = q("*").filter("_type == 'order' && _id == $orderId").slice(0)

  const order = await sanity.fetch<Order>(query, {orderId})

  if (!order || user._id !== order.user._ref) {
    throw createError({
      statusCode: 404,
      message: "Order not found",
      fatal: true,
    })
  }

  return order
})
