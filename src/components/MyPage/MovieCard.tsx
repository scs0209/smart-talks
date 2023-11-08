import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'
import { getImageUrl } from '@/redux/api/tmdb'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Genres from '../common/Genres'
import dayjs from 'dayjs'

interface Props {
  movieId: string
  mediaType: string
}

const MovieCard: FC<Props> = ({ movieId, mediaType }) => {
  const {
    data: movieDetails,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery({ mediaType, id: movieId })

  const posterUrl = movieDetails?.poster && getImageUrl(movieDetails.poster)
  const [imageUrl, setImageUrl] = useState(posterUrl)

  const handleImageError = () => {
    setImageUrl('/images/no-poster.png') // 여기에 대체 이미지 경로를 넣으세요.
  }
  const genres = movieDetails?.genres.map((g: any) => g.name)

  const determineColor = (rating: number) => {
    if (rating < 5) return 'red'
    if (rating < 7) return 'orange'
    return 'green'
  }

  const rating = movieDetails?.rating.toFixed(1)
  return (
    <>
      <div>
        <div className="relative grid h-[15rem] w-full max-w-[13rem] flex-col items-end justify-center bg-transparent bg-clip-border text-center rounded-[10px] text-gray-700 group shadow-lg border-gray-200/5 shadow-gray-400/50">
          <Image
            src={posterUrl}
            onError={handleImageError}
            alt="poster-image"
            width={300}
            height={230}
            className="absolute inset-0 m-0 z-0 h-full w-full overflow-hidden rounded-[10px] bg-transparent bg-cover bg-clip-border bg-center text-gray-700 "
          />
          <div className="to-bg-black-10 rounded-[10px] absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/20" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity rounded-[10px]">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/movies/${mediaType}/${movieId}`}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                상세보기
              </Link>
            </div>
          </div>

          <div className="relative inline-block w-20 p-4 bg-transparent rounded-full -top-[175px] -left-[78px]">
            <CircularProgressbar
              value={rating}
              maxValue={10}
              background
              text={rating}
              styles={buildStyles({
                pathColor: determineColor(rating),
                backgroundColor: 'white',
                trailColor: 'transparent',
                textSize: '30px',
                textColor: determineColor(rating),
              })}
            />
          </div>
        </div>

        <Genres genres={genres} />
      </div>
      <div className="flex flex-col mt-6">
        <span className="overflow-hidden font-sans text-xl font-bold overflow-ellipsis whitespace-nowrap dark:text-white">
          {movieDetails.title || movieDetails.name}
        </span>
        <span className="font-sans text-sm font-extrabold text-gray-500">
          {dayjs(movieDetails.releaseDate).format('MMM D, YYYY')}
        </span>
      </div>
    </>
  )
}

export default MovieCard
