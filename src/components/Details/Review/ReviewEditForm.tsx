import { TOAST_MESSAGE } from '@/constants/toastMessage'
import { useEditReviewMutation } from '@/redux/api/reviewApi'
import { setEditingReview, toggleEditing } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import { ReviewState } from '@/redux/types/interface'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface Props {
  review: ReviewState
}

const ReviewEditForm: FC<Props> = ({ review }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { editingReview } = useSelector((state: RootState) => state.review)
  const [editReview] = useEditReviewMutation()

  const isCurrentUser = session?.user._id === review?.userId._id

  const submitEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault()

    if (!session || !isCurrentUser) {
      toast.error(TOAST_MESSAGE.REVIEW_AUTH)
      return
    }

    await editReview({
      id,
      review: editingReview,
      userId: session?.user._id,
    })
    dispatch(toggleEditing(id))
    dispatch(setEditingReview(''))
  }

  return (
    <form>
      <div className="comment-textarea-wrapper">
        <textarea
          className="comment-textarea"
          defaultValue={review.review}
          onChange={(e) => dispatch(setEditingReview(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="comment-submit-btn mr-2"
        onClick={(e) => submitEdit(e, review._id)}
      >
        Submit
      </button>
      <button
        type="button"
        className="comment-submit-btn"
        onClick={() => dispatch(toggleEditing(review._id))}
      >
        Cancel
      </button>
    </form>
  )
}

export default ReviewEditForm
