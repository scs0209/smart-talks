/* eslint-disable */
import { TOAST_MESSAGE } from '@/constants/toastMessage'
import { useDeleteReviewMutation } from '@/redux/api/reviewApi'
import { toggleEditing } from '@/redux/reducers/reviewSlice'
import { RootState } from '@/redux/store'
import { ReviewState } from '@/redux/types/interface'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface Props {
  review: ReviewState
}

const ReviewDropDown: FC<Props> = ({ review }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [deleteReview] = useDeleteReviewMutation()
  const { dropdownOpen } = useSelector((state: RootState) => state.review)

  // 현재 로그인한 사용자와 리뷰 작성자를 비교
  const isCurrentUser = session?.user._id === review?.userId._id

  const deleteReviews = async (id: string) => {
    if (!session || !isCurrentUser) {
      toast.error(TOAST_MESSAGE.REVIEW_AUTH)
      return
    }

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
        {isCurrentUser && (
          <>
            <li
              className="dropdown-li"
              onClick={() => dispatch(toggleEditing(review._id))}
            >
              Edit
            </li>
            <li
              className="dropdown-li"
              onClick={() => deleteReviews(review._id)}
            >
              Remove
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default ReviewDropDown
