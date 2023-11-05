import {
  useDislikeReviewMutation,
  useGetReviewsQuery,
  useLikeReviewMutation,
} from '@/redux/api/reviewApi'
import { toggleDropdown } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Review } from '@/redux/types/interface'
import dayjs from 'dayjs'
import ReviewEditForm from './ReviewEditForm'
import ReviewDropDown from './ReviewDropDown'
import ReviewForm from './ReviewForm'

interface Props {
  movieId: string | undefined
  session: any
}

const Review: FC<Props> = ({ movieId, session }) => {
  const dispatch = useDispatch()
  const { data: reviews } = useGetReviewsQuery(movieId)
  const [likeReview] = useLikeReviewMutation()
  const [dislikeReview] = useDislikeReviewMutation()

  const { editing } = useSelector((state: RootState) => state.review)

  // 좋아요 버튼 클릭 이벤트 핸들러
  const handleLike = async (reviewId: string) => {
    try {
      await likeReview({ id: reviewId, userId: session?.user._id })
    } catch (err) {
      console.error(err)
    }
  }

  // 싫어요 버튼 클릭 이벤트 핸들러
  const handleDislike = async (reviewId: string) => {
    try {
      await dislikeReview({ id: reviewId, userId: session?.user._id })
    } catch (err) {
      console.error(err)
    }
  }

  let averageRating = 0
  if (reviews) {
    averageRating =
      reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length
  }

  // 소수점 아래 한 자리까지만 표시
  const roundedAverageRating = Math.round(averageRating * 10) / 10

  let scoreCount = Array(6).fill(0)
  let scoreRatio = Array(6).fill(0)
  if (reviews) {
    reviews.forEach((review) => {
      scoreCount[review.rating]++
    })

    scoreRatio = scoreCount.map((count) => count / reviews.length)
  }

  return (
    <section className="comment-wrapper">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                {roundedAverageRating}/5
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                {reviews?.length} reviews
              </span>
            </div>
          </h2>
        </div>
        <div className="mb-2">
          {scoreRatio
            .slice(1)
            .reverse()
            .map((ratio, index) => {
              const score = 5 - index
              return (
                <div className="flex items-center mt-4" key={score}>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {score} star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${ratio * 100}%` }}
                    ></div>
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

        {reviews?.map((review: Review) => {
          console.log(review)
          return (
            <div key={review._id}>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      {review.userId?.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dayjs(review.createdAt).format('YYYY-MM-DD')}
                    </p>
                  </div>

                  <div>
                    <button
                      className="comment-list-dropdown-btn"
                      type="button"
                      onClick={() => dispatch(toggleDropdown(review._id))}
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    <ReviewDropDown review={review} />
                  </div>
                </div>

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
                  <div>
                    {/* 좋아요 버튼 */}
                    <span>
                      <button
                        type="button"
                        className="like-btn"
                        onClick={() => handleLike(review._id)}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                        </svg>
                      </button>
                      {review.likes?.length}
                    </span>
                    {/* 싫어요 버튼 */}
                    <span>
                      <button
                        type="button"
                        className="dislike-btn"
                        onClick={() => handleDislike(review._id)}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z" />
                        </svg>
                      </button>
                      {review.dislikes?.length}
                    </span>
                  </div>
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
