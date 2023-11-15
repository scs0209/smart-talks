import { useGetReviewsQuery } from '@/redux/api/reviewApi'
import { RootState } from '@/redux/store'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ReviewState } from '@/redux/types/interface'
import ReviewEditForm from './ReviewEditForm'
import ReviewForm from './ReviewForm'
import ReviewContentList from './ReviewContentList'
import LikesBtn from './LikesBtn'

interface Props {
  movieId: string | undefined
  session: any
}

const Review: FC<Props> = ({ movieId, session }) => {
  const { data: reviews } = useGetReviewsQuery(movieId)

  const { editing } = useSelector((state: RootState) => state.review)

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0
    return (
      Math.round(
        (reviews.reduce((prev: ReviewState, curr) => prev + curr.rating, 0) /
          reviews.length) *
          10,
      ) / 10
    )
  }, [reviews])

  const scoreRatio = useMemo(() => {
    if (!reviews) return Array(6).fill(0)
    const scoreCount = Array(6).fill(0)
    reviews.forEach((review) => {
      scoreCount[review.rating]++
    })
    return scoreCount.map((count) => count / reviews.length)
  }, [reviews])

  return (
    <section className="comment-wrapper">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              {averageRating}/5
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
            <span className="text-lg lg:text-2xl font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {reviews?.length} reviews
            </span>
          </div>
        </div>
        <div className="mb-2">
          {scoreRatio
            .slice(1)
            .reverse()
            .map((ratio, index) => {
              const score = 5 - index
              return (
                <div className="flex items-center mt-4" key={score}>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {score} star
                  </div>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${ratio * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {Math.round(ratio * 100)}%
                  </span>
                </div>
              )
            })}
        </div>
        {/* 댓글 입력 창 */}
        <ReviewForm movieId={movieId} session={session} />

        {reviews?.map((review: ReviewState) => {
          return (
            <div key={review._id}>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <ReviewContentList review={review} />

                {editing[review._id] ? (
                  <ReviewEditForm review={review} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    {review.review}
                  </p>
                )}

                <div className="flex items-center justify-between mt-4 space-x-4">
                  <button type="button" className="reply-btn">
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                  <LikesBtn review={review} />
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Review
