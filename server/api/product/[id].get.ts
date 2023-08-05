import {Product} from "@/models"

export default defineEventHandler(async (event) => {
  const sanity = useSanity()
  const productId = event.context.params?.id
  const query = groq`*[_type == "product" && _id == $productId][0]`
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
