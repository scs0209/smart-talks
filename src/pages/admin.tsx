import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AdminForm from '@/components/Admin/AdminForm'
import { getPopularMovies } from '@/redux/actions/movie'
import { fetchTheaters } from '@/redux/actions/theater'
import { AppDispatch } from '@/redux/store'

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  return (
    <div className="max-w-screen-lg mx-auto h-screen mt-3">
      <h1 className="font-bold text-3xl dark:text-white">Create Showtime</h1>
      <AdminForm />
    </div>
  )
}

export default AdminPage
