import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// @ts-expect-error typing error
import { getData as getDataLocalStorage, removeItem as removeDataLocalStorage, setData as setDataLocalStorage } from 'nuxt-storage/local-storage'

interface LoginResponse {
  access_token: string
}

const BASE_DOMAIN_SERVER = import.meta.env.SERVER_DOMAIN || 'http://localhost:3001'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getDataLocalStorage('user'))
  const returnUrl = ref(null)

  async function login(username: string, password: string) {
    try {
      const response = await $fetch(`${BASE_DOMAIN_SERVER}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        body: {
          username,
          password,
        },
      })

      const access_token = (response as LoginResponse).access_token
      user.value = {
        username,
        access_token,
      }
      setDataLocalStorage('user', user.value, 1, 'm')
      navigateTo(returnUrl.value || '/')
      return {
        access_token,
        username,
      }
    }
    catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function logout() {
    try {
      await $fetch(`${BASE_DOMAIN_SERVER}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      removeDataLocalStorage('user')
      user.value = null
      // navigateTo('/login')
    }
    catch (error: any) {
      throw new Error(error.message)
    }
  }

  const userIsAuthenticate = computed(() => !!user?.value)
  const getUser = computed(() => user.value)

  return { login, logout, userIsAuthenticate, getUser }
})

export type AuthStore = ReturnType<typeof useAuthStore>
