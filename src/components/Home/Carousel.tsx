import React, { FC, ReactNode, useRef } from 'react'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs'

interface Props {
  children: ReactNode
}

const Carousel: FC<Props> = ({ children }) => {
  const carouselContainer = useRef<any>()

  const navigation = (dir: 'left' | 'right') => {
    console.log('click')
    const container = carouselContainer.current

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative max-w-screen-xl flex mx-auto">
      <BsFillArrowLeftCircleFill
        className="text-4xl text-black absolute top-[44%] transform -translate-y-1/2 cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
        onClick={() => navigation('left')}
      />
      <BsFillArrowRightCircleFill
        className="text-4xl text-black absolute top-[44%] right-0 transform -translate-y-1/2 cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
        onClick={() => navigation('right')}
      />
      <div
        className="flex space-x-6 p-2 -ml-3 overflow-auto example"
        ref={carouselContainer}
      >
        {children}
      </div>
    </div>
  )
}

export default Carousel
