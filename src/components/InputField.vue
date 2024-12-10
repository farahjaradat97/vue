<script setup lang="ts">
defineProps<{
  placeholder: string
  type: string
}>()
const model = defineModel({})
</script>
<template>
  <div class="flex">
    <div class="relative w-full">
      <input
        v-model="model"
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:border-gray-300"
        :placeholder="placeholder"
        :type="type"
        required
      />

      <slot name="action"></slot>
    </div>
  </div>
</template>
