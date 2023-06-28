import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { RootState } from '@/redux/reducers'
import { getPopularMovies } from '@/redux/actions'

const MovieList = () => {
  const dispatch = useDispatch()
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state: any) => {
    console.log('movies', state)
    return state.movies.movies
  })

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  console.log(movies)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <Typography variant="h4">영화 목록</Typography>
      <Grid container spacing={2}>
        {movies?.map((movie: any) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <div>{movie.title}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MovieList
