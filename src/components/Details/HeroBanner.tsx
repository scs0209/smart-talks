import { getImageUrl } from '@/redux/api/tmdb'
import dayjs from 'dayjs'
import Image from 'next/image'
import React, { VFC, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Genres from '../common/Genres'
import VideoPopUp from './VideoPopUp'
import { useSession } from 'next-auth/react'
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/redux/api/favoriteApi'

interface Props {
  movieDetails: any
  mediaType: string | undefined
}

const HeroBanner: VFC<Props> = ({ movieDetails, mediaType }) => {
  const { data: session } = useSession()
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation()
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation()
  const [isFavorite, setIsFavorite] = useState(false)
  const [show, setShow] = useState(false)

  const posterUrl = movieDetails?.poster && getImageUrl(movieDetails.poster)
  const backdropUrl = movieDetails?.poster && getImageUrl(movieDetails.backdrop)
  const genres = movieDetails?.genres.map((g: any) => g.name)
  const videoKey =
    movieDetails?.videos?.length > 0 ? movieDetails.videos[0]?.key : null
  const director = movieDetails?.director
  const writer = movieDetails?.writers

  const determineColor = (rating: number) => {
    if (rating < 5) return 'red'
    if (rating < 7) return 'orange'
    return 'green'
  }

  const rating = movieDetails?.rating.toFixed(1)

  const toHoursAndMinutes = (totalMinutes: any) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite({
          userId: session?.user._id,
          movieId: movieDetails.id,
        })
      } else {
        await addFavorite({
          userId: session?.user._id,
          movieId: movieDetails.id,
          mediaType,
        })
      }
      setIsFavorite(!isFavorite) // 찜 상태 업데이트
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full h-full bg-white dark:bg-[#101725] pt-24 md:pt-30 md:mb-0 mb-12 md:min-h-[700px]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
        <Image
          fill
          src={backdropUrl}
          alt={`${movieDetails.title} poster`}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className="w-full h-full absolute bottom-0 left-0 bg-white-custom-gradient dark:bg-gradient-to-t dark:from-[#101725] dark:to-transparent" />

      <div className="relative flex flex-col max-w-screen-lg gap-6 mx-auto md:gap-12 md:flex-row">
        {/* left */}
        <div className="relative w-full flex-shrink-0 block rounded-[20px] md:max-w-[350px] h-[500px]">
          <Image
            fill
            src={posterUrl}
            alt={`${movieDetails.title} poster`}
            style={{ objectFit: 'cover', borderRadius: '15px' }}
          />
        </div>
        {/* right */}
        <div className="dark:text-white">
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

          <div className="flex flex-row items-center mb-4">
            <div className="w-12 mr-4 bg-transparent rounded-full">
              <CircularProgressbar
                value={rating}
                maxValue={10}
                background
                text={rating}
                styles={buildStyles({
                  pathColor: determineColor(rating),
                  backgroundColor: 'white',
                  textSize: '25px',
                  textColor: determineColor(rating),
                })}
              />
            </div>

            <button
              className="flex items-center space-x-5 cursor-pointer hover:text-blue-300"
              onClick={handleFavorite}
            >
              <div>
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-5xl mr-3" />
                ) : (
                  <FaRegHeart className="text-5xl mr-3" />
                )}
              </div>
            </button>
            <button
              className="flex items-center space-x-5 cursor-pointer hover:text-blue-300"
              onClick={() => {
                setShow(true)
              }}
            >
              <div>
                <BsFillArrowRightCircleFill className="text-5xl" />
              </div>
              <span className="text">Watch Trailer</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="text-xl mb-2.5">Overview</div>
            <div className="leading-6 md:pr-24">{movieDetails?.overview}</div>
          </div>

          <div className="info">
            <div className="infoItem">
              <span className="infoName">Status: </span>
              <span className="infoValue">{movieDetails?.status}</span>
            </div>

            <div className="infoItem">
              <span className="infoName">Release Date: </span>
              <span className="infoValue">
                {dayjs(movieDetails?.releaseDate).format('MMM D, YYYY')}
              </span>
            </div>

            <div className="infoItem">
              <span className="infoName">Runtime: </span>
              <span className="infoValue ">
                {toHoursAndMinutes(movieDetails?.runtime)}
              </span>
            </div>
          </div>

          <div className="info">
            <span className="infoName">Director: </span>
            <span className="infoValue">
              {director?.map((d: any, i: number) => (
                <span key={d}>
                  {d}
                  {director.length - 1 !== i && ', '}
                </span>
              ))}
            </span>
          </div>

          <div className="info">
            <span className="infoName">Writer: </span>
            <span className="infoValue">
              {writer?.map((w: any, i: number) => (
                <span key={w}>
                  {w}
                  {writer.length - 1 !== i && ', '}
                </span>
              ))}
            </span>
          </div>
        </div>

        <VideoPopUp show={show} setShow={setShow} videoKey={videoKey} />
      </div>
    </div>
  )
}
export default HeroBanner
