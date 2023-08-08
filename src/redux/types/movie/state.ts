import { MovieDetails } from '.'
import { Movie, MovieList } from './movie'

export interface MovieState {
  data: Movie[] | null
  movieList: MovieList[] | null
  searchResult: Movie[] | null
  movieDetails?: MovieDetails | null
  loading: boolean
  error: string | undefined
  currentPage: number
  searchCurrentPage: number
}

const initialState: MovieState = {
  data: [],
  searchResult: [],
  movieList: [],
  movieDetails: null,
  loading: false,
  error: undefined,
  currentPage: 0,
  searchCurrentPage: 0,
}

export default initialState
