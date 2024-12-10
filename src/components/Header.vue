<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import IconLightTheme from './icons/IconLightTheme.vue'
import IconDarkTheme from './icons/IconDarkTheme.vue'
import IconLogo from './icons/IconLogo.vue'

const isDark = useDark({})
const toggleDark = useToggle(isDark)
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 border-b shadow dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <div class="flex items-center space-x-2 cursor-pointer">
      <icon-logo />
      <span class="text-lg font-semibold dark:text-gray-50">My Library</span>
    </div>

    <button
      @click="toggleDark()"
      class="flex items-center justify-center p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200"
    >
      <icon-light-theme v-if="isDark" />
      <icon-dark-theme v-else />
    </button>
  </header>
</template>
