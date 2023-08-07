import {checkAuthorizationHeader} from "@/utils"

export default defineEventHandler(async (event) => {
  checkAuthorizationHeader(event)
  return process.env.PAYPAL_CLIENT_ID || "sb"
})
