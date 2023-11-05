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
        review: newReview,
        userId: session?.user._id,
      })
      dispatch(setNewReview(''))
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
          value={newReview}
          onChange={(e) => dispatch(setNewReview(e.target.value))}
        />
      </div>
      <button type="submit" className="comment-submit-btn">
        Post comment
      </button>
    </form>
  )
}

export default ReviewForm
