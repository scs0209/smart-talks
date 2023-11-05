export interface Review {
  _id: string
  movieId: string
  review: string
  userId: User
  createdAt: string
  __v: number
  likes: User['_id'][] // 좋아요 누른 사용자의 ID 목록
  dislikes: User['_id'][] // 싫어요 누른 사용자의 ID 목록
}

export interface User {
  email: string
  _id: string
  username: string
  firstName: string
  lastName: string
  role: string
}
