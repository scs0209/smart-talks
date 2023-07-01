import { MovieDetails } from '.'
import { Movie } from './movie'

export interface MovieState {
  data: Movie[] | null
  movieDetails?: MovieDetails | null
  loading: boolean
  error: string | undefined
}

const initialState: MovieState = {
  data: [],
  movieDetails: null,
  loading: false,
  error: undefined,
}

export default initialState
