import {
  useDislikeReviewMutation,
  useLikeReviewMutation,
} from '@/redux/api/reviewApi'
import { ReviewState } from '@/redux/types/interface'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'

interface Props {
  review: ReviewState
}

const LikesBtn: FC<Props> = ({ review }) => {
  const { data: session } = useSession()
  const [likeReview] = useLikeReviewMutation()
  const [dislikeReview] = useDislikeReviewMutation()

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
  return (
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
  )
}

export default LikesBtn
