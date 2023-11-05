import { usePostReviewMutation } from '@/redux/api/reviewApi'
import { setNewReview } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import React, { FC, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  movieId: string | undefined
  session: any
}

const ReviewForm: FC<Props> = ({ movieId, session }) => {
  const dispatch = useDispatch()
  const [postReview] = usePostReviewMutation()
  const { newReview } = useSelector((state: RootState) => state.review)

  const postComment = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await postReview({
        movieId,
        review: newReview.review,
        rating: newReview.rating,
        userId: session?.user._id,
      })
      dispatch(setNewReview({ review: '', rating: 0 })) // 수정
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className="mb-6" onSubmit={postComment}>
      <div className="comment-textarea-wrapper">
        <textarea
          rows={6}
          className="comment-textarea"
          placeholder="Write a comment..."
          required
          value={newReview.review}
          onChange={(e) =>
            dispatch(setNewReview({ ...newReview, review: e.target.value }))
          }
        />
      </div>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= newReview.rating ? 'text-yellow-300' : 'text-gray-300'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            onClick={() =>
              dispatch(setNewReview({ ...newReview, rating: star }))
            }
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <button type="submit" className="comment-submit-btn">
        Post comment
      </button>
    </form>
  )
}

export default ReviewForm
