import React from 'react'
import MovieList from '@/components/Movie/MovieList'
import Hero from '@/components/Home/Hero'
import SpecialHall from '@/components/Home/SpecialFeature'

export default function Home() {
  return (
    <div>
      <Hero />
      <MovieList />
      <SpecialHall />
    </div>
  )
}
