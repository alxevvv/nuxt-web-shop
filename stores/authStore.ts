import {UserInfo} from "@/models"

const useAuthStore = defineStore("auth", () => {
  const router = useRouter()
  const checkoutStore = useCheckoutStore()

  const {data: userInfo, isInitialized: isUserInfoLoaded} =
    useCookieRef<UserInfo | null>("user-info", null)

  const loginSuccessRedirect = ref("/")

  const isAuthenticated = computed(() => !!userInfo.value)

  function login(data: UserInfo) {
    userInfo.value = data
    router.replace(loginSuccessRedirect.value)
    setLoginSuccessRedirect("/")
  }

  function logout() {
    userInfo.value = null
    checkoutStore.reset()
  }

  function setLoginSuccessRedirect(path: string) {
    loginSuccessRedirect.value = path
  }

  return {
    userInfo,
    isUserInfoLoaded,
    isAuthenticated,

    login,
    logout,
    setLoginSuccessRedirect,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

export {useAuthStore}
