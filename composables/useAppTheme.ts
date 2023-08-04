import {useTheme} from "vuetify"

function useAppTheme() {
  const theme = useTheme()

  const isDarkCookie = useCookie("dark-mode", {
    default: () => (theme.global.name.value === "dark" ? 1 : 0),
  })

  const isDark = ref<boolean>(+isDarkCookie.value === 1)

  const themeIcon = computed(() =>
    theme.global.name.value === "dark" ? "mdi-brightness-3" : "mdi-brightness-5"
  )

  watch(
    isDark,
    (value) => {
      const themeName = value ? "dark" : "light"
      const themeCookie = themeName === "dark" ? 1 : 0
      theme.global.name.value = themeName
      isDarkCookie.value = themeCookie
    },
    {immediate: true}
  )

  return {
    themeName: readonly(theme.global.name),
    themeIcon,
    isDark,
  }
}

export {useAppTheme}
