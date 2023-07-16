import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTheaters } from '@/redux/actions/theater'
import { AppDispatch } from '@/redux/store'
import { getPopularMovies } from '@/redux/actions/movie'
import AdminForm from '@/components/Admin/AdminForm'

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  return (
    <div>
      <h1>Create Showtime</h1>
      <AdminForm />
    </div>
  )
}

export default AdminPage
