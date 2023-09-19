import { getImageUrl } from '@/redux/api/tmdb'
import Image from 'next/image'
import React, { VFC } from 'react'

interface Props {
  cast: any
}

const Cast: VFC<Props> = ({ cast }) => {
  return (
    <div className="relative mb-12">
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="text-lg dark:text-white mb-6">Top Cast</div>
        <div className="flex gap-5 overflow-y-hidden mx-[-20px] px-5 md:mx-0 md:px-0">
          {cast?.map((item: any) => {
            const imgUrl = getImageUrl(item.imageUrl)
            return (
              <div key={item.id} className="text-center dark:text-white">
                <div className="w-[125px] h-[125px] rounded-full overflow-hidden mb-4 md:w-[175px] md:h-[175px] md:mb-6">
                  <Image
                    alt="cast-image"
                    src={imgUrl}
                    width={500}
                    height={500}
                  />
                </div>
                <div className="text-sm leading-[20px] font-semibold md:text-base md:leading-[24px]">
                  {item.name}
                </div>
                <div className="text-sm leading-[20px] opacity-50 md:text-lg md:leading-[24px]">
                  {item.character}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cast
