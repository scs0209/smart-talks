import Image from 'next/image'
import { useRouter } from 'next/router'
import { FormEvent, VFC, useState } from 'react'

interface Props {
  movies: any
}

const Hero: VFC<Props> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const imageUrl = `https://image.tmdb.org/t/p/original/${movies?.results[0].backdrop_path}`

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchTerm.length > 0) {
      router.push(`/search-results/${searchTerm}`)
    }
  }

  return (
    <section className="relative h-[450px] bg-black w-full flex items-center md:h-[700px]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
        <Image
          src={imageUrl}
          alt="배경 이미지"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-white-custom-gradient dark:bg-dark-custom-gradient" />

      <div className="relative flex flex-col items-center max-w-screen-lg mx-auto text-white">
        <span className="text-[50px] font-bold mb-[10px] md:mb-0 md:text-[90px]">
          Welcome.
        </span>
        <span className="text-lg font-medium mb-[40px] md:text-xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </span>
        <div className="flex items-center w-full">
          <form className="w-full" onSubmit={handleSearch}>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="영화, TV 프로그램 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero
