import {
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetReviewsQuery,
  usePostReviewMutation,
} from '@/redux/api/reviewApi'
import React, { FC, useRef, useState } from 'react'

interface Props {
  movieId: string | undefined
  session: any
}

const Review: FC<Props> = ({ movieId, session }) => {
  const { data: reviews } = useGetReviewsQuery(movieId)
  const [postReview] = usePostReviewMutation()
  const [editReview] = useEditReviewMutation()
  const [deleteReview] = useDeleteReviewMutation()

  const [newReview, setNewReview] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({})
  const [editingReview, setEditingReview] = useState('')
  const modalRef = useRef(null)

  // 드랍다운 메뉴를 토글하는 함수
  const toggleDropdown = (id: string) => {
    setDropdownOpen({
      ...dropdownOpen,
      [id]: !dropdownOpen[id],
    })
  }

  const toggleEditing = (id: string) => {
    setEditing({
      ...editing,
      [id]: !editing[id],
    })
  }

  const postComment = async (e: any) => {
    e.preventDefault()
    try {
      await postReview({
        movieId,
        review: newReview,
        userId: session?.user._id,
      })
      setNewReview('')
    } catch (err) {
      console.error(err)
    }
  }

  const submitEdit = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    await editReview({
      id,
      review: editingReview,
      userId: session?.user._id,
    })
    toggleEditing(id)
    setEditingReview('')
  }

  const deleteReviews = async (id: string) => {
    await deleteReview({
      id,
      userId: session?.user._id,
    })
  }

  return (
    <section className="comment-wrapper">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Review ({reviews?.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={postComment}>
          <div className="comment-textarea-wrapper">
            <textarea
              rows={6}
              className="comment-textarea"
              placeholder="Write a comment..."
              required
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </div>
          <button type="submit" className="comment-submit-btn">
            Post comment
          </button>
        </form>

        {reviews?.map((review: any) => {
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
                      onClick={() => toggleDropdown(review._id)}
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
                    <div
                      ref={modalRef}
                      onClick={(e) => {
                        modalRef.current === e.target &&
                          setDropdownOpen({
                            ...dropdownOpen,
                            [review._id]: false,
                          })
                      }}
                      className={`dropdown-wrapper ${
                        dropdownOpen[review._id] ? '' : 'hidden'
                      }`}
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li
                          className="dropdown-li"
                          onClick={() => toggleEditing(review._id)}
                        >
                          Edit
                        </li>
                        <li
                          className="dropdown-li"
                          onClick={() => deleteReviews(review._id)}
                        >
                          Remove
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {editing[review._id] ? (
                  <form>
                    <div className="comment-textarea-wrapper">
                      <textarea
                        className="comment-textarea"
                        defaultValue={review.review}
                        onChange={(e) => setEditingReview(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="comment-submit-btn"
                      onClick={(e) => submitEdit(e, review._id)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="comment-submit-btn"
                      onClick={() => toggleEditing(review._id)}
                    >
                      Cancel
                    </button>
                  </form>
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
