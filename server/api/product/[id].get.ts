import {q} from "groqd"
import {useSanityClient} from "@/composables"
import {Product} from "@/models"

export default defineEventHandler(async (event) => {
  const sanity = useSanityClient()
  const productId = event.context.params?.id
  const {query} = q("*")
    .filter("_type == 'product' && _id == $productId")
    .slice(0)

  const product = await sanity.fetch<Product>(query, {productId})

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
      fatal: true,
    })
  }

  return product
})
