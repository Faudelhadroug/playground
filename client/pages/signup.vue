<script setup lang="ts">
const { username, usernameLengthValidation } = useUsernameVerification()
function useUsernameVerification() {
  const username = ref('')
  const usernameLengthValidation = ref(false)

  watch(username, (newUsername) => {
    usernameLengthVerification(newUsername)
  })

  function usernameLengthVerification(username: string): boolean {
    if (!username || username.length < 4 || username.length > 18)
      return usernameLengthValidation.value = false
    return usernameLengthValidation.value = true
  }
  return {
    username,
    usernameLengthValidation,
  }
}

const { passwordUser, passwordLengthValidation, passwordVarietyValidation, passwordValidation, confirmationPasswordUser, confirmationPasswordValidation } = usePasswordVerification()
function usePasswordVerification() {
  const passwordUser = ref('')
  const passwordLengthValidation = ref(false)
  const passwordVarietyValidation = ref(false)
  const passwordValidation = ref(false)
  const confirmationPasswordUser = ref('')
  const confirmationPasswordValidation = ref(false)

  watch(passwordUser, (newPasswordUser) => {
    checkPasswordLength(newPasswordUser)
    checkPasswordVariety(newPasswordUser)
    confirmationMatchVerification(newPasswordUser, confirmationPasswordUser.value)
    if (passwordLengthValidation.value && passwordVarietyValidation.value)
      passwordValidation.value = true
  })

  watch(confirmationPasswordUser, (newConfirmationPasswordUser) => {
    confirmationMatchVerification(passwordUser.value, newConfirmationPasswordUser)
  })

  function checkPasswordLength(password: string): boolean {
    if (password.length < 8 || password.length > 32)
      return passwordLengthValidation.value = false
    return passwordLengthValidation.value = true
  }

  function checkPasswordVariety(password: string): boolean {
    if (!password)
      return false
    const options = [
      /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      /[a-zA-Z]/,
      /[0-9]/,
    ]
    const count = options.reduce((acc, option) => acc + (option.test(password) ? 1 : 0), 0)
    return count >= 2 ? passwordVarietyValidation.value = true : passwordVarietyValidation.value = false
  }

  function confirmationMatchVerification(password: string | Ref<string>, confirmationPassword: string | Ref<string>) {
    if (!password || !confirmationPassword || password !== confirmationPassword)
      return confirmationPasswordValidation.value = false
    return confirmationPasswordValidation.value = true
  }

  return {
    passwordUser,
    passwordLengthValidation,
    passwordVarietyValidation,
    passwordValidation,
    confirmationPasswordUser,
    confirmationPasswordValidation,
  }
}

const { validationSignUp, userSignUp } = useSignUp()
function useSignUp() {
  const errorSignUp = ref(false)
  const errorMessage = ref('')

  function validationSignUp(): boolean {
    if (!usernameLengthValidation.value || !passwordValidation.value || !confirmationPasswordValidation.value)
      return false
    return true
  }

  function userSignUp() {
    // TryCatch signup users
    try {

    }
    catch (error) {
      errorSignUp.value = true
    }
  }

  return {
    errorSignUp,
    errorMessage,
    validationSignUp,
    userSignUp,
  }
}
</script>

<template>
  <div class="grid xl:grid-cols-2 h-screen text-emerald-950 text-lg">
    <div class="w-container pt-[64px] bg-emerald-800 pb-8 flex-center">
      <div>
        <h1 class="font-bold uppercase text-center xl:text-left text-green-300">
          Sign up
        </h1>
        <form class="grid gap-y-[8px] bg-emerald-300 px-12 py-8 rounded-md" @submit.prevent>
          <label for="pseudo">Username</label>
          <input id="pseudo" v-model="username" class="inputText" type="text">
          <InfoValidationInput :condition="usernameLengthValidation">
            Username: 4-18 characters.
          </InfoValidationInput>
          <label for="password">Password</label>
          <input id="password" v-model="passwordUser" class="inputText" type="password">
          <InfoValidationInput :condition="passwordLengthValidation">
            Password: 8-32 characters
          </InfoValidationInput>
          <InfoValidationInput :condition="passwordVarietyValidation">
            Password includes minimum two of the following: letter, number, or symbol.
          </InfoValidationInput>
          <label for="confirmPassword">Confirmation password</label>
          <input id="confirmPassword" v-model="confirmationPasswordUser" class="inputText" type="password">
          <InfoValidationInput :condition="confirmationPasswordValidation">
            Confirmation password must match the password.
          </InfoValidationInput>
          <div class="flex-center pt-4">
            <input type="submit" class="bg-gray-700 text-white px-4 py-2 rounded-xl" value="Sign up" :disabled="!validationSignUp()" :class="[validationSignUp() ? 'cursor-pointer' : 'cursor-not-allowed']" @click="userSignUp()">
          </div>
        </form>
      </div>
    </div>
    <div class="hidden xl:block bg-red-400 h-screen" />
  </div>
</template>
