import { Button } from 'flowbite-react'

import { useAdminPage } from '@/contexts/AdminContext'

import MovieCreate from './MovieCreate'
import StartEndCreate from './StartEndCreate'
import TheaterNScreenCreate from './TheaterNScreenCreate'

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
