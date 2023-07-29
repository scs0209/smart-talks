import Link from 'next/link'
import { useRouter } from 'next/router'

import { signUp } from '@/redux/api/auth'

import useInput from '../../hooks/useInput'
import InputWithLabel from './InputWithLabel'
import { FormEvent } from 'react'

const SignupForm = () => {
  const username = useInput('')
  const email = useInput('')
  const password = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signUp({
        username: username.value,
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      })
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              회원가입
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputWithLabel
                labelName="이름"
                inputType="text"
                inputValue={firstName.value}
                inputOnChange={firstName.onChange}
                placeholderText="사용자 이름"
              />
              <InputWithLabel
                labelName="성"
                inputType="text"
                inputValue={lastName.value}
                inputOnChange={lastName.onChange}
                placeholderText="성"
              />
              <InputWithLabel
                labelName="닉네임"
                inputType="text"
                inputValue={username.value}
                inputOnChange={username.onChange}
                placeholderText="닉네임"
              />
              <InputWithLabel
                labelName="Email"
                inputType="email"
                inputValue={email.value}
                inputOnChange={email.onChange}
                placeholderText="eamil"
              />
              <InputWithLabel
                labelName="Password"
                inputType="password"
                inputValue={password.value}
                inputOnChange={password.onChange}
                placeholderText="password"
              />
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
