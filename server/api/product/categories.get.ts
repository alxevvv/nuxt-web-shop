import {q} from "groqd"
import {uniq} from "lodash"
import {useSanityClient} from "@/composables"

export default defineEventHandler(async (event) => {
  const sanity = useSanityClient()

  const {query} = q("*").filter("_type == 'product'").grabOne("category")

  return uniq(await sanity.fetch<string[]>(query))
})
