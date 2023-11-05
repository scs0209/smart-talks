export interface Session {
  user: User
  expires: string
}

export interface User {
  email: string
  _id: string
  username: string
  firstName: string
  lastName: string
  role: string
}
