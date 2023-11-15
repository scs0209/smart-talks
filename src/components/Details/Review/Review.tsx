import { useGetReviewsQuery } from '@/redux/api/reviewApi'
import { RootState } from '@/redux/store'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReviewState } from '@/redux/types/interface'
import ReviewEditForm from './ReviewEditForm'
import ReviewForm from './ReviewForm'
import ReviewContentList from './ReviewContentList'
import LikesBtn from './LikesBtn'
import EvaluationStar from './EvaluationStar'

interface Props {
  movieId: string | undefined
  session: any
}

const Review: FC<Props> = ({ movieId, session }) => {
  const { data: reviews } = useGetReviewsQuery(movieId)

  const { editing } = useSelector((state: RootState) => state.review)

  return (
    <section className="comment-wrapper">
      <div className="max-w-2xl mx-auto px-4">
        <EvaluationStar reviews={reviews} />

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
