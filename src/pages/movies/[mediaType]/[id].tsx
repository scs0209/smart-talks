import { useRouter } from 'next/router'

import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'
import { getImageUrl } from '@/redux/api/tmdb'
import Image from 'next/image'
import dayjs from 'dayjs'
import Genres from '@/components/common/Genres'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { PlayIcon } from '@/components/Detail/PlayBtn'
import { useState } from 'react'
import VideoPopUp from '@/components/Details/VideoPopUp'

interface Genre {
  id: number
  name: string
}

const MovieDetail = () => {
  const router = useRouter()
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
  const [show, setShow] = useState(false)

  const posterUrl = movieDetails?.poster && getImageUrl(movieDetails.poster)
  const backdropUrl = movieDetails?.poster && getImageUrl(movieDetails.backdrop)
  const genres = movieDetails?.genres.map((g: any) => g.name)
  const videoKey = movieDetails?.videoKey

  console.log(videoKey)

  const determineColor = (rating: number) => {
    if (rating < 5) return 'red'
    if (rating < 7) return 'orange'
    return 'green'
  }

  const rating = movieDetails?.rating.toFixed(1)

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !movieDetails) {
    return <div>Error: {isError || 'Movie details not available'}</div>
  }

  return (
    <section className="h-screen">
      <div className="w-full h-full bg-black pt-24 md:pt-30 md:mb-0 mb-12 md:min-h-[700px]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <Image
            fill
            src={backdropUrl}
            alt={`${movieDetails.title} poster`}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="w-full h-[250px] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-[#04152d] opacity-80" />

        <div className="relative flex flex-col max-w-screen-lg gap-6 mx-auto md:gap-12 md:flex-row">
          {/* left */}
          <div className="relative flex-shrink-0 w-full block rounded-[20px] md:max-w-[350px] h-[500px]">
            <Image
              fill
              src={posterUrl}
              alt={`${movieDetails.title} poster`}
              style={{ objectFit: 'cover', borderRadius: '15px' }}
            />
          </div>
          {/* right */}
          <div className="text-white">
            <div className="text-3xl leading-[40px] md:text-4xl md:leading-[44px] title">
              {`${movieDetails.name || movieDetails.title} (${dayjs(
                movieDetails?.releaseDate,
              ).format('YYYY')})`}
            </div>
            <div className="mb-4 text-base italic leading-6 opacity-50 md:text-lg md:leading-7 subtitle">
              {movieDetails.tagLine}
            </div>

            <div className="flex flex-wrap mb-6">
              <Genres genres={genres} />
            </div>

            <div className="flex-row">
              <div className="relative inline-block w-20 p-4 bg-transparent rounded-full -bottom-9">
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

              <button
                className="flex items-center space-x-5 cursor-pointer playbtn"
                onClick={() => {
                  setShow(true)
                }}
              >
                <div className="w-15 md:w-20">
                  <PlayIcon />
                </div>
                <span className="text">Watch Trailer</span>
              </button>
            </div>
          </div>
          <VideoPopUp show={show} setShow={setShow} videoKey={videoKey} />
        </div>
      </div>
    </section>
  )
}

export default MovieDetail
