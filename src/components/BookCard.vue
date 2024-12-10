<script lang="ts" setup>
import type { SingleBook } from '@/helpers/interfaces/books.interface'
import router from '@/router'

defineProps<{
  book: SingleBook
}>()
</script>

<template>
  <div
    class="flex w-full flex-col items-stretch bg-white border border-gray-200 rounded shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="object-cover w-full h-40 md:h-auto md:w-40"
      alt="Book cover"
      :src="book.imgSrc ? book.imgSrc : '/src/assets/default.jpeg'"
    />
    <div class="p-5 flex flex-col w-full">
      <div>
        <h5
          class="mb-2 w-full text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
        >
          {{ book.title }}
        </h5>
        <p v-if="book.author" class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ book.author }}
        </p>
      </div>
      <button
        @click="
          router.push({
            name: 'single-book',
            params: {
              bookId: book.id,
            },
          })
        "
        class="border border-blue-800 dark:border-blue-600 text-blue-800 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white self-end px-4 py-2 flex justify-end items-end rounded mt-auto hover:text-white hover:bg-blue-800"
      >
        Read Now
      </button>
    </div>
  </div>
</template>
