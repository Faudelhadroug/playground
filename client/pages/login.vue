<script setup lang="ts">
const username = ref('pol')
const passwordUser = ref('123@456@789')

const authStore = useAuthStore()
const { userIsAuthenticate } = storeToRefs(authStore)

const { validationLogin, errorAuthMessage } = useAuthLogin()
function useAuthLogin() {
  const errorAuthMessage = ref('')
  async function validationLogin(): Promise<boolean> {
    try {
      await authStore.login(username.value, passwordUser.value)
    }
    catch (error) {
      errorAuthMessage.value = 'Bad credentials'
    }
    return false
  }
  return { validationLogin, errorAuthMessage }
}
</script>

<template>
  <ClientOnly>
    <div class="grid xl:grid-cols-2 h-screen text-blue-950 text-lg">
      <div class="hidden xl:block bg-red-400 h-screen">
        <NuxtImg src="../public/abstract02.jpg" alt="Abstract decoration" class="h-full w-full absolute" />
      </div>
      <div v-if="!userIsAuthenticate" class="w-container pt-[64px] bg-blue-800 pb-8 flex-center">
        <div>
          <h1 class="font-bold uppercase text-center xl:text-left text-blue-300 text-xl5">
            Login
          </h1>
          <form class="grid gap-y-[8px] bg-blue-300 px-12 py-8 rounded-md" @submit.prevent>
            <label for="pseudo">Username</label>
            <input id="pseudo" v-model="username" class="inputText" type="text">
            <label for="password" class="pt-2">Password</label>
            <input id="password" v-model="passwordUser" class="inputText" type="password">
            <div v-if="errorAuthMessage" class="text-red-700 text-center font-bold">
              <p> {{ errorAuthMessage }}</p>
            </div>
            <div class="flex-center">
              <input type="submit" class="bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer" value="Sign in" @click="validationLogin()">
            </div>
            <Nuxt-Link to="/register">
              <p>You don't have account ? Sign up here</p>
            </Nuxt-Link>
          </form>
        </div>
      </div>
      <div v-else>
        <div class="flex-center bg-blue-300 h-full">
          <input type="button" class="bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer" value="Logout" @click="authStore.logout()">
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
