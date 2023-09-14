import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import ChangePasswordModal from '@/components/ChangePasswordModal'
import HeadInfo from '@/components/common/HeadInfo'
import useModal from '@/hooks/useModal'
import { useGetUserByEmailQuery } from '@/redux/api/userApi'

const MyPage = () => {
  const router = useRouter()
  const { email } = router.query
  const { data: session, status } = useSession()
  const { data: user } = useGetUserByEmailQuery(email)
  const { isModalOpen, openModal, closeModal } = useModal()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in</div>
  }

  return (
    <div className="items-center h-screen text-center align-middle dark:bg-gray-800">
      <HeadInfo title={`${email}'s Page`} />
      <h1 className="text-5xl p-[4rem] dark:text-white">My Page</h1>
      <div className="flex items-center justify-center">
        <h2 className="mt-3 mb-3 text-3xl dark:text-white">
          Email: {session.user?.email}
        </h2>
        <Button color="blue" outline onClick={openModal}>
          Change Password
        </Button>
      </div>
      <ChangePasswordModal open={isModalOpen} handleClose={closeModal} />
    </div>
  )
}

MyPage.requireAuth = true

export default MyPage
