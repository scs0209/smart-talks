import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.query<any[], string | undefined>({
      query: (movieId) => `movies/review?movieId=${movieId}`,
      providesTags: ['Reviews'],
    }),
    postReview: builder.mutation<any, Partial<any>>({
      query: ({ movieId, review, userId }) => ({
        url: `movies/review`,
        method: 'POST',
        body: {
          movieId,
          review,
          userId,
        },
      }),
      // 리뷰를 추가한 후에 getReviews 쿼리의 캐시를 무효화
      invalidatesTags: ['Reviews'],
    }),
  }),
})

export const { useGetReviewsQuery, usePostReviewMutation } = reviewApi

export default reviewApi
