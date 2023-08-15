import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import ChangePasswordModal from '@/components/ChangePasswordModal'
import HeadInfo from '@/components/common/HeadInfo'
import ReservationTable from '@/components/MyPage/ReservationTable'
import useModal from '@/hooks/useModal'
import { useGetUserByEmailQuery } from '@/redux/api/userApi'

const MyPage = () => {
  const router = useRouter()
  const { email } = router.query
  const { data: session, status } = useSession()
  const { data: user } = useGetUserByEmailQuery(email)
  const { isModalOpen, openModal, closeModal } = useModal()

  console.log(session)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in</div>
  }

  return (
    <div className="items-center h-screen max-w-screen-lg mx-auto text-center align-middle">
      <HeadInfo title={`${email}'s Page`} />
      <h1 className="mt-5 text-5xl dark:text-white">My Page</h1>
      <div className="flex items-center justify-center">
        <h2 className="mt-3 mb-3 text-3xl dark:text-white">
          Email: {session.user?.email}
        </h2>
        <Button gradientDuoTone="purpleToBlue" outline onClick={openModal}>
          Change Password
        </Button>
      </div>
      <ReservationTable user={user} />
      <ChangePasswordModal open={isModalOpen} handleClose={closeModal} />
    </div>
  )
}

MyPage.requireAuth = true

export default MyPage
