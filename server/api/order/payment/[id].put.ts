import {useSanityClient} from "@/composables"
import {checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  checkAuthorizationHeader(event)

  const sanity = useSanityClient()
  const orderId = event.context.params?.id
  const body = await readBody(event)

  const mutationsResult = await sanity.mutate(
    [
      {
        patch: {
          id: orderId!,
          set: {
            isPaid: true,
            paidAt: new Date().toISOString(),
            "paymentResult.id": body.id,
            "paymentResult.status": body.status,
            "paymentResult.emailAddress": body.payer?.email_address ?? "",
          },
        },
      },
    ],
    {
      returnDocuments: true,
    }
  )

  return mutationsResult[0]
})
