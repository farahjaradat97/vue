<script lang="ts" setup>
defineProps<{
  primaryMessage: string
  secondaryMessage?: string
}>()
</script>

<template>
  <div
    class="flex gap-6 flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded shadow border dark:border-gray-700 mx-auto"
  >
    <slot name="icon"></slot>
    <div class="text-center">
      <p class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {{ primaryMessage }}
      </p>
      <p v-if="secondaryMessage" class="text-sm text-gray-600 dark:text-gray-400">
        {{ secondaryMessage }}
      </p>
    </div>
  </div>
</template>
