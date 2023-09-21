import Image from 'next/image'
import React, { VFC, useState } from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import VideoPopUp from './VideoPopUp'

interface Props {
  videos: any
}

const VideoSection: VFC<Props> = ({ videos }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  return (
    <div className="relative mb-12 videosSection">
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="dark:text-white text-2xl font-semibold mb-6 sectionHeading">
          Official Videos
        </div>
        <div className="flex space-x-[10px] overflow-x-auto pr-5 pl-5 md:space-x-5 md:pr-0 md:pl-0 videos">
          {videos?.map((video: any) => (
            <div
              key={video.id}
              className="w-[250px] h-[200px] flex-shrink-0 cursor-pointer videoItem"
              onClick={() => {
                setVideoId(video.key)
                setShow(true)
              }}
            >
              <div className="relative mb-[15px] w-full h-[150px] block rounded-md transition-all duration-700 ease-in-out">
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt="thumbnail"
                  fill
                  className="rounded-md"
                />
                <BsFillArrowRightCircleFill className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-25 z-5 text-5xl hover:opacity-60" />
              </div>
              <div className="dark:text-white text-sm leading-snug md:text-base md:leading-normal videoTitle">
                {video.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <VideoPopUp show={show} setShow={setShow} videoKey={videoId} />
    </div>
  )
}

export default VideoSection
