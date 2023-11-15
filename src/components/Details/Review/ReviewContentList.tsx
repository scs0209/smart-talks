import { toggleDropdown } from '@/redux/reducers/reviewSlice'
import { ReviewState } from '@/redux/types/interface'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import ReviewDropDown from './ReviewDropDown'

interface Props {
  review: ReviewState
}

const ReviewContentList: FC<Props> = ({ review }) => {
  const dispatch = useDispatch()

  return (
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
  )
}

export default ReviewContentList
