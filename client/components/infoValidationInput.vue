<script setup lang="ts">
defineProps<{
  condition: Boolean
}>()
</script>

<template>
  <div class="flex xl:justify-normal">
    <div class="flex-center">
      <div v-if="condition" class="flex-center w-6 h-6 bg-lime-500 rounded-full">
        <Icon name="ic:baseline-check" />
      </div>
      <div v-else class="flex-center w-6 h-6 bg-gray-400 rounded-sm">
        <Icon name="ic:baseline-clear" color="" />
      </div>
    </div>
    <p><slot></slot></p>
  </div>
</template>


