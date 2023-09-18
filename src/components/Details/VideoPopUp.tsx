import React, { Dispatch, VFC } from 'react'
import ReactPlayer from 'react-player/youtube'

interface Props {
  videoKey: string | null
  show: boolean
  setShow: Dispatch<React.SetStateAction<boolean>>
}

const VideoPopUp: VFC<Props> = ({ videoKey, show, setShow }) => {
  const hidePopup = () => {
    setShow(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-400 ${
        show ? 'opacity-100 visible' : 'opacity-0 invisible'
      } z-10`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 backdrop-blur-md transition-opacity duration-400"
        onClick={hidePopup}
      ></div>
      <div
        className={`relative transform transition-transform duration-[250ms] bg-white ${
          show ? 'scale-[1]' : 'scale-[0.2]'
        } aspect-w-16 aspect-h-9 max-w-[800px] mx-auto`}
      >
        <span
          className="absolute -top-[20px] right-[10px] text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls
          width="700px"
          height="400px"
          playing={show}
        />
      </div>
    </div>
  )
}

export default VideoPopUp
