import { useSession } from 'next-auth/react'
import { FC, FormEvent } from 'react'

import useInput from '@/hooks/useInput'
import { useChangePasswordMutation } from '@/redux/api/userApi'

interface Props {
  open: boolean
  handleClose: () => void
}

const ChangePasswordModal: FC<Props> = ({ open, handleClose }) => {
  const { data: session, status } = useSession() // 세션 정보 로딩 상태
  const currentPassword = useInput('')
  const newPassword = useInput('')
  const [changePassword, { isLoading, isError }] = useChangePasswordMutation()

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await changePassword({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        session,
      })
      alert('비밀번호 변경 완료')
      handleClose()
      // 비밀번호 변경 성공 처리
    } catch (err: any) {
      alert(err.response.data)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please sign in to continue.</div>
  }

  return (
    <div
      onClick={handleClose}
      className={`flex justify-center fixed top-10 z-40 ${
        open ? '' : 'hidden'
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            className="px-6 py-6 lg:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Change Password
            </h3>
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div>
                <label
                  htmlFor="current password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={currentPassword.value}
                  onChange={currentPassword.onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="new password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New password
                </label>
                <input
                  type="password"
                  value={newPassword.value}
                  onChange={newPassword.onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleChangePassword}
                disabled={isLoading}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoading ? 'Loading...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal
