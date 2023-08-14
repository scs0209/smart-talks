import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '@/redux/api/userApi'

interface FormValue {
  email: string
  password: string
  lastName: string
  firstName: string
  username: string
}

const SignupForm = () => {
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              회원가입
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="사용자 이름"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm
