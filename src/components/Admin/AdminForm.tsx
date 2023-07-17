import { useAdminPage } from '@/contexts/AdminContext'
import MovieCreate from './MovieCreate'
import TheaterNScreenCreate from './TheaternScreenCreate'
import StartEndCreate from './StartEndCreate'
import { Button } from 'flowbite-react'

const AdminForm = () => {
  const { handleSubmit } = useAdminPage()

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <MovieCreate />
      <TheaterNScreenCreate />
      <StartEndCreate />
      <Button color="gray" type="submit">
        Create Showtime
      </Button>
    </form>
  )
}

export default AdminForm
