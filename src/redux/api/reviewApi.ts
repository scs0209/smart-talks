import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const reviewApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getReviews: builder.query<any[], string | undefined>({
      query: (movieId) => `movies/review?movieId=${movieId}`,
    }),
    // 기타 엔드포인트...
  }),
})

export const { useGetReviewsQuery } = reviewApi

export default reviewApi
