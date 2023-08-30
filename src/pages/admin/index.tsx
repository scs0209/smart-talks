import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/api/userApi'
import { Button, Table } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import { Head } from 'next/document'
import Link from 'next/link'

const AdminPage = () => {
  const { data: adminUser } = useSession()
  const { data: users, isLoading, refetch } = useGetAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

  const handleDeleteUser = async (
    userId: string,
    adminId: string | undefined,
  ) => {
    if (!adminId) {
      alert('Admin ID not found')
      return
    }
    try {
      await deleteUser({ userId, adminId })
      alert('User deleted successfully!')
      refetch()
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-5">Admin Page</h1>
        <Table>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
          <Table.Body>
            {users.users.map((user: any) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>
                  <Button
                    gradientDuoTone="purpleToPink"
                    outline
                    size="xs"
                    onClick={() =>
                      handleDeleteUser(user._id, adminUser?.user._id)
                    }
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="justify-end flex gap-2 mt-3">
          <Button color="dark" size="xs">
            <Link href="/admin/theater">Go to Create Theater</Link>
          </Button>
          <Button color="dark" size="xs">
            <Link href="/admin/screen">Go to Create Screen</Link>
          </Button>
          <Button color="dark" size="xs">
            <Link href="/admin/showtime">Go to Create Showtime</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

AdminPage.requireAuth = true
AdminPage.allowRole = 'admin'

export default AdminPage
