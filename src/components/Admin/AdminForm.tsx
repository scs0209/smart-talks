import { useAdminPage } from '@/contexts/AdminContext'
import MovieCreate from './MovieCreate'
import TheaterNScreenCreate from './TheaternScreenCreate'
import StartEndCreate from './StartEndCreate'

const AdminForm = () => {
  const { handleSubmit } = useAdminPage()

  return (
    <form onSubmit={handleSubmit}>
      <MovieCreate />
      <TheaterNScreenCreate />
      <StartEndCreate />
      <button type="submit">Create Showtime</button>
    </form>
  )
}

export default AdminForm
