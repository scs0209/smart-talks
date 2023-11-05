export interface Review {
  _id: string
  movieId: string
  review: string
  userId: User
  createdAt: string
  __v: number
}

export interface User {
  email: string
  _id: string
  username: string
  firstName: string
  lastName: string
  role: string
}
