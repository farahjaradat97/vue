import { createRouter, createWebHistory } from 'vue-router'
import AllBooksView from '@/views/AllBooksView.vue'
import SingleBookView from '@/views/SingleBookView.vue'
import BookAnalysis from '@/components/BookAnalysis.vue'
import BookDetails from '@/components/BookDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'books',
      },
    },
    {
      path: '/books',
      name: 'books',
      component: AllBooksView,
    },
    {
      path: '/books/:bookId',
      name: 'single-book',
      component: SingleBookView,
      redirect: {
        name: 'book-details',
      },
      children: [
        {
          path: '/books/:bookId/details',
          name: 'book-details',
          component: BookDetails,
        },
        {
          path: '/books/:bookId/analysis',
          name: 'book-analysis',
          component: BookAnalysis,
        },
      ],
    },
  ],
})

export default router
