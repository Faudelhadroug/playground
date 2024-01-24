<script setup lang="ts">
const pseudoUser = ref('')
const pseudoLengthValidation = ref(false)
watch(pseudoUser, (newPseudoUser) => {
  checkPseudoLength(newPseudoUser)
})
function checkPseudoLength(pseudo: string): boolean {
  if (!pseudo || pseudo.length < 4 || pseudo.length > 18)
    return pseudoLengthValidation.value = false
  return pseudoLengthValidation.value = true
}

const passwordUser = ref('')
const passwordLengthValidation = ref(false)
const passwordVarietyValidation = ref(false)
const passwordValidation = ref(false)

watch(passwordUser, (newPasswordUser) => {
  checkPasswordLength(newPasswordUser)
  checkPasswordVariety(newPasswordUser)
  confirmationMatchVerification(newPasswordUser, confirmationPasswordUser.value)
  if(passwordLengthValidation.value && passwordVarietyValidation.value) passwordValidation.value = true
})

function checkPasswordLength(password: string): boolean {
  if (password.length < 8 || password.length > 32)
    return passwordLengthValidation.value = false
  return passwordLengthValidation.value = true
}

function checkPasswordVariety(password: string): boolean {
  if(!password) return false
  const options = [
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    /[a-zA-Z]/,
    /[0-9]/,
  ]
  const count = options.reduce((acc, option) => acc + (option.test(password) ? 1 : 0), 0)
  return count >= 2 ? passwordVarietyValidation.value = true : passwordVarietyValidation.value = false 
}

const confirmationPasswordUser = ref('')
const confirmationMatchPassword = ref(false)
watch(confirmationPasswordUser, (newConfirmationPasswordUser) => {
  confirmationMatchVerification(passwordUser.value, newConfirmationPasswordUser)
})

function confirmationMatchVerification(password: string | Ref<string>, confirmationPassword:  string | Ref<string>){
  if(!password || !confirmationPassword || password !== confirmationPassword) return confirmationMatchPassword.value = false
  return confirmationMatchPassword.value = true
}
</script>

<template>
  <div class="grid xl:grid-cols-2">
    <div class="w-container pt-[64px] bg-amber-200">
      <h1 class="font-bold uppercase">
        Sign up
      </h1>
      <form class="grid gap-y-[8px] bg-amber-500" @submit.prevent>
        <label for="pseudo">Pseudo</label>
        <input id="pseudo" v-model="pseudoUser" class="inputText" type="text">
        <InfoValidationInput :condition="pseudoLengthValidation">Pseudo must be between 4-18 characters.</InfoValidationInput>
        <label for="password">Password</label>
        <input id="password" v-model="passwordUser" class="inputText" type="password">
        <InfoValidationInput :condition="passwordLengthValidation">Must be 8 characters long with a maximum of 32 characters.</InfoValidationInput>
        <InfoValidationInput :condition="passwordVarietyValidation">Password includes two of the following: letter, number, or symbol.</InfoValidationInput>
        <label for="confirmPassword">Confirmation password</label>
        <input id="confirmPassword" v-model="confirmationPasswordUser" class="inputText" type="password">
        <InfoValidationInput :condition="confirmationMatchPassword">The confirmation password match with the password.</InfoValidationInput>
      </form>
    </div>
    <div class="hidden xl:block bg-red-400 h-screen" />
  </div>
</template>
