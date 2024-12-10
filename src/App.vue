<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useBooksStore } from './stores/books'
const bookStore = useBooksStore()
const { initializeBooks } = bookStore
initializeBooks()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="p-6 bg-gray-50 dark:bg-gray-30 w-full h-full grow">
      <div class="container m-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
