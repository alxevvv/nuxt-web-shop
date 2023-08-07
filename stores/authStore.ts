import {UserInfo} from "@/models"

const useAuthStore = defineStore("auth", () => {
  const {data: userInfo, isInitialized: isUserInfoLoaded} =
    useCookieRef<UserInfo | null>("user-info", null)

  const isAuthenticated = computed(() => !!userInfo.value)

  function login(data: UserInfo) {
    userInfo.value = data
  }

  function logout() {
    userInfo.value = null
  }

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
