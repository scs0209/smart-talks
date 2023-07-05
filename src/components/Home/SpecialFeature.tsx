import { Card, CustomFlowbiteTheme } from 'flowbite-react'
import Footer from '../Footer'
import { useState } from 'react'
import Link from 'next/link'

const customTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex',
  },
}

const SpecialHall = () => {
  const [currentImage, setCurrentImage] = useState(
    'https://img.cgv.co.kr//Front/Main/2021/1130/16382612660560.png',
  )

  const handleMouseOver = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          특별관
        </h1>
        <div className="flex">
          <div className="basis-1/2">
            <Card
              className="max-w-full"
              imgSrc={currentImage}
              theme={customTheme}
            ></Card>
          </div>
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 dark:text-white ml-3 basis-1/2 flex flex-col">
            <li className="p-3 rounded hover:border-solid hover:border-gray-100 hover:border-2 flex-grow flex items-center">
              <Link
                onMouseOver={() =>
                  handleMouseOver(
                    'https://img.cgv.co.kr//Front/Main/2021/1130/16382612660560.png',
                  )
                }
                href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7"
              >
                CINE de CHEF
              </Link>
            </li>
            <li className="p-3 rounded hover:border-solid hover:border-gray-100 hover:border-2 flex-grow items-center flex">
              <Link
                onMouseOver={() =>
                  handleMouseOver(
                    'https://img.cgv.co.kr//Front/Main/2022/0616/16553622935690.png',
                  )
                }
                href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7"
              >
                CINE & LIVINGROOM
              </Link>
            </li>
            <li className="p-3 rounded hover:border-solid hover:border-gray-400 hover:border-2 flex-grow items-center flex">
              <Link
                onMouseOver={() =>
                  handleMouseOver(
                    'https://img.cgv.co.kr//Front/Main/2021/1209/16390080561620.png',
                  )
                }
                href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7"
              >
                SUITE CINEMA
              </Link>
            </li>
            <li className="p-3 rounded hover:border-solid hover:border-gray-400 hover:border-2 flex-grow items-center flex">
              <Link
                onMouseOver={() =>
                  handleMouseOver(
                    'https://img.cgv.co.kr//Front/Main/2021/1130/16382612660240.png',
                  )
                }
                href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7"
              >
                4DX
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SpecialHall
