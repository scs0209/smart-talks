import React from 'react'

const HeroBannerSkeleton = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-[#101725] pt-24 md:pt-30 md:mb-0 mb-12 md:min-h-[700px]">
      <div className="relative flex flex-col max-w-screen-lg gap-6 mx-auto md:gap-12 md:flex-row">
        {/* left */}
        <div className="relative w-full flex-shrink-0 block rounded-[20px] md:max-w-[350px] h-[500px] animate-pulse bg-gray-300" />
        {/* right */}
        <div className="space-y-6 w-full md:w-1/2">
          <div className="h-12 animate-pulse bg-gray-300" />
          <div className="h-4 animate-pulse bg-gray-300" />
          <div className="h-6 animate-pulse bg-gray-300" />
          <div className="h-4 animate-pulse bg-gray-300" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/3" />
          <div className="h-32 animate-pulse bg-gray-300" />
          <div className="h-6 animate-pulse bg-gray-300" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
          <div className="h-4 animate-pulse bg-gray-300 w-1/2" />
        </div>
      </div>
    </div>
  )
}

export default HeroBannerSkeleton
