import {CookieSetOptions} from "universal-cookie"
import {useCookies} from "@vueuse/integrations/useCookies"

const defaultCookieOptions: CookieSetOptions = {
  path: "/",
}

function useCookieRef<T>(
  cookieName: string,
  initialValue: T,
  cookieOptions: CookieSetOptions = {}
) {
  const _cookieOptions = {...defaultCookieOptions, ...cookieOptions}

  const cookies = useCookies([cookieName])

  const isInitialized = ref(false)
  const data = ref(initialValue)

  watch(data, (newData) => {
    if (isInitialized.value) {
      cookies.set(cookieName, newData, _cookieOptions)
    }
  })

  onMounted(() => {
    const cookieData = cookies.get(cookieName)
    if (cookieData) {
      data.value = cookieData
    }
    isInitialized.value = true
  })

  return {
    isInitialized,
    data,
  }
}

export {useCookieRef}
