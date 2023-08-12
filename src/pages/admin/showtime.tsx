import AdminForm from '@/components/Admin/AdminForm'

const AdminPage = () => {
  return (
    <div className="h-screen max-w-screen-lg mx-auto mt-3">
      <h1 className="text-3xl font-bold dark:text-white">Create Showtime</h1>
      <AdminForm />
    </div>
  )
}

export default AdminPage
