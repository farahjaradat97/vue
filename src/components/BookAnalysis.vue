<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'
import IconLoading from './icons/IconLoading.vue'
//Data
const bookStore = useBooksStore()
const analysisResult: Ref<undefined | string[]> = ref([])
const { singleBook } = storeToRefs(bookStore)
const isLoading: Ref<boolean> = ref(false)
const error: Ref<boolean> = ref(false)
//Functions
const analysisBook = async () => {
  isLoading.value = true
  try {
    error.value = false
    if (singleBook.value) {
      const data = await bookStore.analysisBook(singleBook?.value)
      if (data) {
        analysisResult.value = data?.choices?.[0]?.message?.content?.split('\n')
      }
    }
  } catch (e) {
    error.value = true
  } finally {
    isLoading.value = false
  }
}
//Computed
analysisBook()
const filteredAnalysisResult = computed(() => {
  //Filter out empty or whitespace-only strings from `analysisResult`
  if (!analysisResult.value || analysisResult.value.length === 0) return []
  return analysisResult.value.filter((item) => item.trim() !== '')
})
</script>

<template>
  <div class="flex justify-center items-start mt-80" v-if="isLoading">
    <IconLoading />
  </div>
  <div
    v-else
    class="flex-1 overflow-y-auto min-h-full border dark:border-gray-700 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow-md"
  >
    <div v-for="(section, index) in filteredAnalysisResult" :key="index">
      <div
        :class="
          section.startsWith('**')
            ? `text-xl font-bold capitalize text-gray-800 dark:text-white mb-3 border-b-2 border-blue-500 my-4 pb-2`
            : ' text-gray-700 dark:text-gray-300 mt-1'
        "
      >
        {{ section.startsWith('**') ? section.replace(/\*\*/g, '').replace(':', '') : section }}
      </div>
    </div>
  </div>
</template>
