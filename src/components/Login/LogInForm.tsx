import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { handleSignupClick } from '@/redux/reducers/authorSlice'
import { RootState } from '@/redux/store'
import FindPasswordModal from '../FindPasswordModal'
import SocialBtn from './SocialBtn'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessage'

interface FormValue {
  email: string
  password: string
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const { isSignUpActive } = useSelector((state: RootState) => state.author)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' })
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })
      if (result?.error) {
        toast.error(result?.error)
      } else {
        toast.success(TOAST_MESSAGE.LOGIN_SUCCESS)
        router.push('/')
      }
    } catch (error: any) {
      console.error('Error:', error.message)
    }
  })

  const handleForgotPasswordClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div
      className={`absolute w-1/2 left-0 z-2 top-0 h-full transition-all duration-600 ease-in-out ${
        isSignUpActive ? 'translate-x-full' : ''
      }`}
    >
      <form
        className="bg-white flex items-center justify-center flex-col p-10 h-full"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          로그인
        </h1>
        <div className="w-full">
          <div className="relative">
            <input
              type="email"
              className="author-input2 peer"
              placeholder="Email"
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
            />
            <label id="email" className="author-label2">
              Email
            </label>
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type="password"
              className="author-input2 peer"
              placeholder="Password"
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자리 이상이어야 합니다.',
                },
              })}
            />
            <label id="password" className="author-label2">
              Password
            </label>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 w-full">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="author-checkbox"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <span
            onClick={handleForgotPasswordClick}
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </span>
        </div>
        <button type="submit" className="author-btn">
          Sign in
        </button>
        <SocialBtn />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{' '}
          <span
            onClick={() => dispatch(handleSignupClick())}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </span>
        </p>
      </form>
      <FindPasswordModal open={showModal} onClose={handleCloseModal} />
    </div>
  )
}

export default LoginForm
