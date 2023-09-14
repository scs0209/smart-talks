import React from 'react'

import Hero from '@/components/Home/Hero'
import SpecialHall from '@/components/Home/SpecialFeature'
import MovieList from '@/components/Movie/MovieList'
import { GetStaticProps } from 'next'
import { wrapper } from '@/redux/store'
import movieApi, { getRunningQueriesThunk } from '@/redux/api/movieApi'
import { useScroll, motion } from 'framer-motion'

export default function Home({ movies }: any) {
  const { scrollYProgress } = useScroll()
  const results = movies.queries['getPopularMovies(1)'].data

  return (
    <>
      <motion.div
        className="fixed left-0 z-30 w-full h-1 bg-blue-500 md:top-[70px]"
        style={{ scaleX: scrollYProgress }}
      />
      <Hero movies={results} />
      <MovieList />
      <SpecialHall />
    </>
  )
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    // RTK Query 디스패치
    store.dispatch(movieApi.endpoints.getPopularMovies.initiate(1))

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    const movies = store.getState()[movieApi.reducerPath]

    // 페이지에 필요한 데이터를 props로 반환합니다.
    return {
      props: {
        movies,
      },
      revalidate: 60 * 60, // 선택: 캐시된 데이터를 재확인하기 위한 대기 시간 (초)
    }
  },
)
