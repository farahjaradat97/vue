import type { AllBooks, SingleBook } from '@/helpers/interfaces/books.interface'
import axios, { AxiosError } from 'axios'
import Groq from 'groq-sdk'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useBooksStore = defineStore('books', () => {
  //Data
  const allBooks: Ref<AllBooks> = ref({})
  const singleBook: Ref<SingleBook | null> = ref(null)

  //Functions
  const initializeBooks = () => {
    //get all books stored in locaStorage
    const storedBooks = localStorage.getItem('books')
    allBooks.value = storedBooks ? JSON.parse(storedBooks) : null
  }
  const fetchSingleBook = async (bookId: string) => {
    // Reset the singleBook state to null
    singleBook.value = null
    // Check if the book is already stored in localStorage and allBooks
    const book = localStorage.getItem(`book-${bookId}`)
    if (book && allBooks.value[bookId]) {
      // If found, load the book from localStorage and update its viewed timestamp

      singleBook.value = JSON.parse(book)
      allBooks.value[bookId].viewedAt = new Date().toISOString()
    } else {
      // If not found, fetch the book's content and metadata
      const [content, metadata] = await Promise.all([
        fetchBookContentById(bookId),
        fetchBookMetadataById(bookId),
      ])
      const { data: contentData, error: contentError } = content
      const { data: metaData, error: metaError } = metadata
      if (metaError) {
        singleBook.value = null
        throw new Error()
      }
      // Parse metadata HTML to extract details
      const domElement = new DOMParser().parseFromString(metaData, 'text/html')
      const imgSrc = domElement.querySelector('img.cover-art')?.getAttribute('src')
      const tableRows = domElement.querySelectorAll('#bibrec table.bibrec tr')
      // Extract metadata details into an object
      const data: {
        [key: string]: string[]
      } = {}
      tableRows?.forEach((row) => {
        const th = row.querySelector('th')
        const td = row.querySelector('td')

        if (th && td) {
          const key = th.textContent?.trim()?.toLowerCase() || ''
          if (!data[key]) data[key] = []
          data[key].push(td.textContent?.trim() || '')
        }
      })
      const newBook = {
        id: bookId,
        content: contentError ? undefined : contentData,
        metadata: data,
        title: data.title?.[0] || '',
        author: data.author?.[0] || data.editor?.[0] || '-',
        imgSrc: imgSrc ?? undefined,
      }

      singleBook.value = newBook
      // Update allBooks with the new book data and update the view timestamp
      allBooks.value = {
        ...allBooks.value,
        [bookId]: {
          id: bookId,
          author: newBook.author,
          title: newBook.title,
          imgSrc: newBook.imgSrc,
          viewedAt: new Date().toISOString(),
        },
      }

      // Save the updated books to localStorage
      localStorage.setItem('books', JSON.stringify(allBooks.value))
      localStorage.setItem(`book-${bookId}`, JSON.stringify(newBook))
    }
  }
  const fetchBookContentById = async (bookId: number | string) => {
    try {
      const { data } = await axios<string>(`/api/files/${bookId}/${bookId}-0.txt`)
      return { data }
    } catch (error) {
      return { error: error as AxiosError }
    }
  }
  const fetchBookMetadataById = async (bookId: Number | String) => {
    try {
      const { data } = await axios<string>(`https://www.gutenberg.org/ebooks/${bookId}`, {})
      return { data }
    } catch (error) {
      return { error: error as AxiosError }
    }
  }
  const analysisBook = (book: SingleBook) => {
    // Initialize a Groq instance
    const groq = new Groq({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    })

    return groq.chat.completions.create({
      messages: [
        // The system's role, providing instructions on how the AI should behave

        { role: 'system', content: `You are a literary analysis expert.` },
        // The user's request, specifying what to analyze in the book

        {
          role: 'user',
          content: `
analyze this book "${book?.content ? book?.content?.slice(0, 25000) : book?.title}"  Sentiment Analysis, key characters,language detection, and Plot Summary. Response should only contain the analysis text.`,
        },
      ],

      model: 'llama3-8b-8192',
      temperature: 0.1,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    })
  }

  return {
    fetchSingleBook,
    allBooks,
    singleBook,
    analysisBook,
    initializeBooks,
  }
})
