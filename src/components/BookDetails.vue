<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia'

const bookStore = useBooksStore()
const { singleBook } = storeToRefs(bookStore)
</script>

<template>
  <div
    class="flex-1 overflow-y-auto max-h-min border dark:border-gray-700 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow-md"
  >
    <div v-for="(values, key) in singleBook?.metadata" :key="key" class="space-y-2">
      <h3
        class="text-xl font-bold capitalize text-gray-800 dark:text-white mb-3 border-b-2 border-blue-500 my-3 pb-2"
      >
        {{ key }}
      </h3>
      <p
        class="text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide text-base opacity-90 hover:opacity-100 transition-opacity"
        v-for="(value, index) in values"
        :key="index"
      >
        {{ value }}
      </p>
    </div>
  </div>
</template>
