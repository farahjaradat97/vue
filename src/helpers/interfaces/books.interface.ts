export interface SingleBook {
  id: number | string
  author: string
  title: string
  imgSrc?: string
  content?: string

  metadata?: { [key: string]: string[] }
}
export interface AllBooks {
  [key: string]: {
    id: string
    author: string
    title: string
    imgSrc?: string
    viewedAt: string
  }
}
