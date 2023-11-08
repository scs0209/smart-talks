/* eslint-disable */
import { useDeleteReviewMutation } from '@/redux/api/reviewApi'
import { toggleEditing } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import { ReviewState } from '@/redux/types/interface'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  review: ReviewState
}

const ReviewDropDown: FC<Props> = ({ review }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [deleteReview] = useDeleteReviewMutation()
  const { dropdownOpen } = useSelector((state: RootState) => state.review)

  const deleteReviews = async (id: string) => {
    await deleteReview({
      id,
      userId: session?.user._id,
    })
  }

  return (
    <div
      className={`dropdown-wrapper ${dropdownOpen[review._id] ? '' : 'hidden'}`}
    >
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li
          className="dropdown-li"
          onClick={() => dispatch(toggleEditing(review._id))}
        >
          Edit
        </li>
        <li className="dropdown-li" onClick={() => deleteReviews(review._id)}>
          Remove
        </li>
      </ul>
    </div>
  )
}

export default ReviewDropDown
