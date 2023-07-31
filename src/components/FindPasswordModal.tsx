import { FC } from 'react'

import useInput from '@/hooks/useInput'
import { sendTempPasswordEmail } from '@/redux/api/user'

interface Props {
  open: boolean
  onClose: () => void
}

const FindPasswordModal: FC<Props> = ({ open, onClose }) => {
  const email = useInput('')
  const receiveEmail = useInput('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendTempPasswordEmail(email.value, receiveEmail.value)
      alert('Temporary password email sent successfully')
    } catch (error: any) {
      console.log('Failed to send temporary password email:', error.message)
    }
  }

  return (
    <div
      onClick={onClose}
      className={`flex justify-center fixed top-0 z-40 ${
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
              비밀번호 찾기
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={email.value}
                  onChange={email.onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="receive-email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Receive Email
                </label>
                <input
                  type="email"
                  value={receiveEmail.value}
                  onChange={receiveEmail.onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                임시 비밀번호 전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindPasswordModal
