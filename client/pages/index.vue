<script setup lang="ts">
import type { AuthStore } from '~/stores/auth.store'

definePageMeta({
  middleware: ['home'],
})

const authStore: AuthStore = useAuthStore()
const { getUser }: any = storeToRefs(authStore)
</script>

<template>
  <div>
    <h1>Hello {{ getUser.username }}</h1>
  </div>
</template>
