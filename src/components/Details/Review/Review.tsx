import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from '@/redux/api/reviewApi'
import { setNewReview, toggleDropdown } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewEditForm from './ReviewEditForm'
import ReviewDropDown from './ReviewDropDown'
import { Review } from '@/redux/types/interface'

interface Props {
  movieId: string | undefined
  session: any
}

const Review: FC<Props> = ({ movieId, session }) => {
  const dispatch = useDispatch()
  const { data: reviews } = useGetReviewsQuery(movieId)
  const [postReview] = usePostReviewMutation()

  const { editing, newReview } = useSelector((state: RootState) => state.review)

  const postComment = async (e: any) => {
    e.preventDefault()
    try {
      await postReview({
        movieId,
        review: newReview,
        userId: session?.user._id,
      })
      dispatch(setNewReview(''))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="comment-wrapper">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Review ({reviews?.length})
          </h2>
        </div>
        {/* 댓글 입력 창 */}
        <form className="mb-6" onSubmit={postComment}>
          <div className="comment-textarea-wrapper">
            <textarea
              rows={6}
              className="comment-textarea"
              placeholder="Write a comment..."
              required
              value={newReview}
              onChange={(e) => dispatch(setNewReview(e.target.value))}
            />
          </div>
          <button type="submit" className="comment-submit-btn">
            Post comment
          </button>
        </form>

        {reviews?.map((review: Review) => {
          return (
            <div key={review._id}>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      {review.userId?.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Feb. 8, 2022
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

                <div className="flex items-center mt-4 space-x-4">
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
