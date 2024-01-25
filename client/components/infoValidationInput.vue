<script setup lang="ts">
defineProps<{
  condition: boolean
}>()
</script>

<template>
  <div class="flex xl:justify-normal text-sm xl:text-md">
    <div class="flex-center pr-2">
      <div v-if="condition" class="flex-center w-6 h-6 bg-lime-600 rounded-full">
        <Icon name="ic:baseline-check" color="white" />
      </div>
      <div v-else class="flex-center w-6 h-6 bg-gray-400 rounded-sm">
        <Icon name="ic:baseline-clear" color="" />
      </div>
    </div>
    <p class="w-full">
      <slot />
    </p>
  </div>
</template>
