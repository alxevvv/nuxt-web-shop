import {useCookies} from "@vueuse/integrations/useCookies"
import {UserInfo} from "@/models"

const useAuthStore = defineStore("auth", () => {
  const cookies = useCookies(["user-info"])

  const isUserInfoLoaded = ref(false)
  const userInfo = ref<UserInfo | null>(null)

  const isAuthenticated = computed(() => !!userInfo.value)

  function login(data: UserInfo) {
    userInfo.value = data
  }

  function logout() {
    userInfo.value = null
  }

  watch(userInfo, (newUserInfo) => {
    if (isUserInfoLoaded.value) {
      cookies.set("user-info", newUserInfo, {path: "/"})
    }
  })

  onMounted(() => {
    const cookieUserInfo = cookies.get("user-info")
    if (cookieUserInfo) {
      userInfo.value = cookieUserInfo
    }
    isUserInfoLoaded.value = true
  })

  return {
    userInfo,
    isUserInfoLoaded,
    isAuthenticated,

    login,
    logout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

export {useAuthStore}
