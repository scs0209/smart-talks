import {
  Action,
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'

import moviesSlice from './reducers/movieSlice'
import movieApi from './api/movieApi'
import { userApi } from './api/userApi'
import reviewApi from './api/reviewApi'
import reviewSlice from './reducers/reviewSlice'
import authorSlice from './reducers/authorSlice'
import favoriteApi from './api/favoriteApi'

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    [movieApi.reducerPath]: movieApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    movies: moviesSlice,
    review: reviewSlice,
    author: authorSlice,
  })(state, action)
}

const makeStore = (context: Context) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        movieApi.middleware,
        userApi.middleware,
        reviewApi.middleware,
        favoriteApi.middleware,
      ),
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: true,
})
