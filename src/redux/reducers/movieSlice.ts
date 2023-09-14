import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchState {
  allResults: any[]
  page: number
  popularMovies: any[]
  popularPage: number
}

const initialState: SearchState = {
  allResults: [],
  page: 1,
  popularMovies: [],
  popularPage: 1,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setAllResults: (state, action: PayloadAction<any[]>) => {
      if (state.page === 1) {
        state.allResults = action.payload
      } else if (state.page > 1) {
        state.allResults = [...state.allResults, ...action.payload]
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPopularMovies: (state, action: PayloadAction<any[]>) => {
      if (state.popularPage === 1) {
        state.popularMovies = action.payload
      } else if (state.popularPage > 1) {
        state.popularMovies = [...state.popularMovies, ...action.payload]
      }
    },
    setPopularPage: (state, action: PayloadAction<number>) => {
      state.popularPage = action.payload
    },
  },
})
export const { setAllResults, setPage, setPopularMovies, setPopularPage } =
  moviesSlice.actions

export default moviesSlice.reducer
