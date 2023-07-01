import { MovieDetails } from '../types/movie'
import { Movie } from '../types/movie/movie'

export enum MoviesActionTypes {
  SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
  SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
  GET_MOVIE_DETAILS_REQUEST = 'GET_MOVIE_DETAILS_REQUEST',
  GET_MOVIE_DETAILS_SUCCESS = 'GET_MOVIE_DETAILS_SUCCESS',
  GET_MOVIE_DETAILS_FAILURE = 'GET_MOVIE_DETAILS_FAILURE',
  GET_POPULAR_MOVIES_REQUEST = 'GET_POPULAR_MOVIES_REQUEST',
  GET_POPULAR_MOVIES_SUCCESS = 'GET_POPULAR_MOVIES_SUCCESS',
  GET_POPULAR_MOVIES_FAILURE = 'GET_POPULAR_MOVIES_FAILURE',
  SET_MOVIES = 'SET_MOVIES', // SET_MOVIES 타입 추가
}

export type MovieAction =
  | { type: MoviesActionTypes.SEARCH_MOVIES_REQUEST }
  | { type: MoviesActionTypes.SEARCH_MOVIES_SUCCESS; payload: Movie[] }
  | { type: MoviesActionTypes.SEARCH_MOVIES_FAILURE; payload: string }
  | { type: MoviesActionTypes.GET_MOVIE_DETAILS_REQUEST }
  | { type: MoviesActionTypes.GET_MOVIE_DETAILS_SUCCESS; payload: MovieDetails }
  | { type: MoviesActionTypes.GET_MOVIE_DETAILS_FAILURE; payload: string }
  | { type: MoviesActionTypes.GET_POPULAR_MOVIES_REQUEST }
  | { type: MoviesActionTypes.GET_POPULAR_MOVIES_SUCCESS; payload: Movie[] }
  | { type: MoviesActionTypes.GET_POPULAR_MOVIES_FAILURE; payload: string }
  | { type: MoviesActionTypes.SET_MOVIES; payload: Movie[] } // SET_MOVIES 액션 추가

export type SetMoviesAction = {
  type: MoviesActionTypes.SET_MOVIES
  payload: Movie[]
}
