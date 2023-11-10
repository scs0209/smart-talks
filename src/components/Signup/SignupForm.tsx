import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '@/redux/api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { handleLoginClick } from '@/redux/reducers/authorSlice'
import { RootState } from '@/redux/store'

interface FormValue {
  email: string
  password: string
  lastName: string
  firstName: string
  username: string
}

const SignupForm = () => {
  const dispatch = useDispatch()
  const { isSignUpActive } = useSelector((state: RootState) => state.author)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' })
  const router = useRouter()
  const [signUp, { isLoading, isError }] = useSignUpMutation()

  const onSubmit = handleSubmit(async (formData) => {
    // Change handleSubmit to onSubmit
    try {
      await signUp({
        username: formData.username, // Replace with formData
        email: formData.email, // Replace with formData
        password: formData.password, // Replace with formData
        firstName: formData.firstName, // Replace with formData
        lastName: formData.lastName, // Replace with formData
      })
      alert('회원가입 완료!')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div
      className={`absolute w-1/2 opacity-0 left-0 top-0 h-full transition-all duration-600 ease-in-out ${
        isSignUpActive ? 'translate-x-full opacity-100 z-50 animate-move' : ''
      }`}
    >
      <form
        className="bg-white flex items-center justify-center flex-col p-10 h-full"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          회원가입
        </h1>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            이름
          </label>
          <input
            type="text"
            placeholder="사용자 이름"
            className="author-input"
            {...register('firstName', {
              required: '이름은 필수입니다.',
            })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            성
          </label>
          <input
            type="text"
            className="author-input"
            {...register('lastName', {
              required: '성은 필수 입력입니다.',
            })}
            placeholder="성"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            닉네임
          </label>
          <input
            type="text"
            className="author-input"
            {...register('username', {
              required: '닉네임은 필수입니다.',
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: '닉네임은 알파벳, 숫자, 밑줄만 허용합니다.',
              },
            })}
            placeholder="Nickname"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            className="author-input"
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
            placeholder="name@company.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="author-input"
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자리 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="author-btn mt-4">
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => dispatch(handleLoginClick())}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignupForm
