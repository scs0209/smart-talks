import { useRouter } from 'next/router'

import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'
import HeroBanner from '@/components/Details/HeroBanner'
import Cast from '@/components/Details/Cast'
import VideoSection from '@/components/Details/VideoSection'
import Similar from '@/components/Details/Similar'
import Recommendation from '@/components/Details/Recommendation'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { client } from '@/redux/api/client'

const MovieDetail = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [reviews, setReviews] = useState<any>([])
  const [newReview, setNewReview] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {},
  )
  const modalRef = useRef(null)

  // 기존 코드

  // 드랍다운 메뉴를 토글하는 함수
  const toggleDropdown = (id: string) => {
    setDropdownOpen({
      ...dropdownOpen,
      [id]: !dropdownOpen[id],
    })
  }

  console.log(dropdownOpen)

  const mediaType = Array.isArray(router.query.mediaType)
    ? router.query.mediaType[0]
    : router.query.mediaType

  const movieId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id
  const {
    data: movieDetails,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery({ mediaType, id: movieId })

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await client.get(`/api/movies/review?movieId=${movieId}`)
      setReviews(response.data)
    }

    fetchReviews()
  }, [movieId])

  const cast = movieDetails?.cast
  const videos = movieDetails?.videos
  const similar = movieDetails?.similar
  const recommendations = movieDetails?.recommendations

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !movieDetails) {
    return <div>Error: {isError || 'Movie details not available'}</div>
  }

  // 댓글을 게시하는 함수
  const postComment = async (e: any) => {
    e.preventDefault()
    const response = await client.post('/api/movies/review', {
      movieId,
      review: newReview,
      userId: session?.user._id,
    })
    setReviews([...reviews, response.data.review])
    setNewReview('')
  }

  const editReview = async (id: string, review: string) => {
    const response = await client.put('/api/movies/review', {
      id,
      review,
      userId: session?.user._id,
    })

    // 서버에서 반환된 수정된 리뷰를 찾아서 상태를 업데이트
    setReviews(
      reviews.map((r: any) => (r._id === id ? response.data.review : r)),
    )
  }

  const deleteReview = async (id: string) => {
    await client.delete(
      `/api/movies/review?id=${id}&userId=${session?.user._id}`,
    )

    // 삭제된 리뷰를 상태에서 제거
    setReviews(reviews.filter((r: any) => r._id !== id))
  }

  return (
    <section className="detail">
      <HeroBanner movieDetails={movieDetails} />
      <Cast cast={cast} />
      <VideoSection videos={videos} />
      <Similar similar={similar} />
      <Recommendation recommendations={recommendations} />
      <section className="comment-wrapper">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Review ({reviews.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={postComment}>
            <div className="comment-textarea-wrapper">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
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

          {reviews.map((review: any) => {
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
                            onClick={() => editReview(review._id, newReview)}
                          >
                            Edit
                          </li>
                          <li
                            className="dropdown-li"
                            onClick={() => deleteReview(review._id)}
                          >
                            Remove
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400">
                    {review.review}
                  </p>
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
    </section>
  )
}

export default MovieDetail
