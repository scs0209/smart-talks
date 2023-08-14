import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import ChangePasswordModal from '@/components/ChangePasswordModal'
import HeadInfo from '@/components/common/HeadInfo'
import ReservationTable from '@/components/MyPage/ReservationTable'
import { MyPageProvider } from '@/contexts/MyPageContext'
import useModal from '@/hooks/useModal'

const MyPage = () => {
  const router = useRouter()
  const { email } = router.query
  const { data: session, status } = useSession()
  const { isModalOpen, openModal, closeModal } = useModal()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in</div>
  }

  return (
    <MyPageProvider email={email}>
      <div className="h-screen max-w-screen-lg mx-auto text-center items-center align-middle">
        <HeadInfo title={`${email}'s Page`} />
        <h1 className="dark:text-white text-5xl mt-5">My Page</h1>
        <div className="flex justify-center items-center">
          <h2 className="dark:text-white text-3xl mt-3 mb-3">
            Email: {session.user?.email}
          </h2>
          <Button gradientDuoTone="purpleToBlue" outline onClick={openModal}>
            Change Password
          </Button>
        </div>
        <ReservationTable />
        <ChangePasswordModal open={isModalOpen} handleClose={closeModal} />
      </div>
    </MyPageProvider>
  )
}

MyPage.requireAuth = true

export default MyPage
