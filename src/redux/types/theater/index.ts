import { ITheaterBranch } from '@/models/Theater'

export interface Screen {
  id: string
  name: string
}

export interface Theater {
  _id: string
  name: string
  branches: ITheaterBranch[]
}

export interface TheaterState {
  theaters: Array<Theater>
  loading: boolean
  error: any
}
