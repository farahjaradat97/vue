<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { computed } from 'vue'
import IconBook from '@/components/icons/IconBook.vue'
import { ref } from 'vue'
import BookCardVue from '@/components/BookCard.vue'
import { useRouter } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'

//Data
const bookId: Ref<number | string> = ref('')
const router = useRouter()
const booksStore = useBooksStore()
const { allBooks } = storeToRefs(booksStore)
//Functions
const getBookById = () => {
  if (bookId.value) {
    router.push({
      name: 'single-book',
      params: {
        bookId: bookId.value,
      },
    })
  }
}

//Computed
const books = computed(() => {
  //convert the allBooks object values into array and sort them by the 'viewAt'property
  if (allBooks.value) {
    return Object.values(allBooks.value).sort(
      (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime(),
    )
  } else {
    return null
  }
})
</script>

<template>
  <main>
    <form class="w-1/2 mx-auto">
      <InputField
        placeholder="Enter Book ID here"
        v-model="bookId"
        type="number"
        @keydown.enter="getBookById()"
      >
        <template v-slot:action>
          <button
            type="submit"
            @click="getBookById()"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Search
          </button>
        </template>
      </InputField>
    </form>
    <div class="py-10">
      <div v-if="books" class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-for="book in books" :key="book.id">
          <BookCardVue :book="book" />
        </template>
      </div>
      <div class="w-full" v-else>
        <EmptyState
          primaryMessage="Your Library is Empty"
          secondaryMessage="Start exploring by adding a book ID to get started."
        >
          <template #icon>
            <IconBook />
          </template>
        </EmptyState>
      </div>
    </div>
  </main>
</template>
