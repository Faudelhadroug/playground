export default defineNuxtRouteMiddleware((_to, _from) => {
  const authStore = useAuthStore()
  const { userIsAuthenticate } = storeToRefs(authStore)
  if (!userIsAuthenticate.value)
    return navigateTo('/login')
})
