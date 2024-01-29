<script setup lang="ts">
const username = ref('')
const passwordUser = ref('')
function validationLogin(): boolean {
  return false
}

</script>

<template>
  <div class="grid xl:grid-cols-2 h-screen text-emerald-950 text-lg">
    <div class="hidden xl:block bg-red-400 h-screen" />
    <div class="w-container pt-[64px] bg-emerald-800 pb-8 flex-center">
      <div>
        <h1 class="font-bold uppercase text-center xl:text-left text-green-300">
          Login
        </h1>
        <form class="grid gap-y-[8px] bg-emerald-300 px-12 py-8 rounded-md" @submit.prevent>
          <label for="pseudo">Username</label>
          <input id="pseudo" v-model="username" class="inputText" type="text">
          <label for="password" class="pt-2">Password</label>
          <input id="password" v-model="passwordUser" class="inputText" type="password">
          <div class="flex-center pt-4">
            <input type="submit" class="bg-gray-700 text-white px-4 py-2 rounded-xl" value="Sign up" :disabled="!validationLogin()" :class="[validationLogin() ? 'cursor-pointer' : 'cursor-not-allowed']" @click="userSignUp()">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
