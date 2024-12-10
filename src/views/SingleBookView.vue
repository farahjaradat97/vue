<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconLoading from '@/components/icons/IconLoading.vue'
import IconNotFound from '@/components/icons/IconNotFound.vue'
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

//Data
const bookStore = useBooksStore()
const { singleBook } = storeToRefs(bookStore)
const route = useRoute()
const isLoading: Ref<boolean> = ref(false)
const bookId = route?.params?.bookId
const error: Ref<boolean> = ref(false)
//Functions
const getBook = async () => {
  isLoading.value = true
  try {
    if (bookId) {
      await bookStore.fetchSingleBook(bookId as string)
      isLoading.value = false
    }
  } catch (e) {
    error.value = true
  }
}
const downloadBookContent = () => {
  if (!singleBook?.value?.content) return
  const blob = new Blob([singleBook.value.content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${singleBook.value.title}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
getBook()
</script>

<template>
  <div v-if="!error">
    <div class="flex justify-center items-center py-10 h-screen" v-if="isLoading">
      <IconLoading />
    </div>
    <div v-else>
      <nav class="flex items-center space-x-2" aria-label="Breadcrumb">
        <span
          @click="$router.push('/books')"
          class="text-gray-500 hover:text-gray-800 font-semibold cursor-pointer dark:text-gray-500 dark:hover:text-gray-200"
          >Books</span
        >
        <span class="text-gray-700 font-semibold w-fit">/</span>
        <span class="text-gray-700 font-semibold dark:text-gray-300">{{ singleBook?.title }}</span>
      </nav>
      <div
        class="max-w-full min-h-full flex flex-col md:flex-row bg-transparent dark:bg-gray-800 items-start"
      >
        <div class="flex-col md:h-auto my-6 mr-10 md:flex-shrink-0 flex justify-center items-start">
          <img
            :src="singleBook?.imgSrc ? singleBook?.imgSrc : '/src/assets/default.jpeg'"
            alt="Book Cover"
            class="w-full object-cover border rounded shadow-md"
          />
          <div v-if="singleBook?.content" class="flex gap-4 mt-6 w-full">
            <button
              @click="downloadBookContent()"
              class="w-full flex items-center justify-center gap-2 text-center px-6 py-2 bg-blue-600 text-white font-bold rounded shadow-md hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Download
              <IconDownload />
            </button>
          </div>
        </div>

        <div class="flex flex-col justify-start flex-grow p-6 mb-6 text-gray-200">
          <h1
            class="text-2xl font-semibold text-gray-950 dark:text-white tracking-tight leading-tight truncate md:whitespace-normal"
          >
            {{ singleBook?.title }}
          </h1>
          <p v-if="singleBook?.author" class="text-base text-gray-800 dark:text-gray-400 mt-2">
            By
            <span class="font-bold text-gray-950 dark:text-gray-100">{{ singleBook?.author }}</span>
          </p>

          <div class="mt-4 flex border-b dark:border-gray-600 mb-4">
            <button
              class="tab-link px-6 py-3 text-lg font-semibold text-gray-500 hover:text-blue-400 focus:outline-none transition duration-200"
              :class="{
                'border-b-2 border-blue-500 text-blue-500': $route.name === 'book-details',
              }"
              @click="
                $router.push({
                  name: 'book-details',
                  params: {
                    bookId: singleBook?.id,
                  },
                })
              "
            >
              Book Details
            </button>

            <button
              class="tab-link px-6 py-3 text-lg font-semibold text-gray-500 hover:text-blue-400 focus:outline-none transition duration-200"
              :class="{
                'border-b-2 border-blue-500 text-blue-500': $route.name === 'book-analysis',
              }"
              @click="
                $router.push({
                  name: 'book-analysis',
                  params: {
                    bookId: singleBook?.id,
                  },
                })
              "
            >
              Book Analysis
            </button>
          </div>

          <RouterView />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <EmptyState
      primary-message="We couldn't find the book"
      secondary-message="Please check the book ID and try again."
    >
      <template #icon>
        <IconNotFound />
      </template>
    </EmptyState>
  </div>
</template>
