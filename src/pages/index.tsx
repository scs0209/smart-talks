import React from 'react'

import Hero from '@/components/Home/Hero'
import SpecialHall from '@/components/Home/SpecialFeature'
import MovieList from '@/components/Movie/MovieList'

export default function Home() {
  return (
    <div>
      <Hero />
      <MovieList />
      <SpecialHall />
    </div>
  )
}
