import {useSanityClient} from "@/composables"
import {checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  const user = checkAuthorizationHeader(event)

  const sanity = useSanityClient()

  const body = await readBody(event)

  const order = await sanity.create(
    {
      _type: "order",
      user: {
        _type: "reference",
        _ref: user._id,
      },
      username: user.name,
      items: body.items,
      shippingAddress: body.shippingInfo,
      paymentMethod: body.paymentMethod,
      itemsPrice: body.itemsPrice,
      shippingPrice: body.shippingPrice,
      taxPrice: body.taxPrice,
      totalPrice: body.totalPrice,
      isPaid: false,
      isDelivered: false,
    },
    {
      returnDocuments: true,
    }
  )

  return order
})
