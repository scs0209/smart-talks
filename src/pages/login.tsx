import Head from '@/components/common/HeadInfo'
import LoginForm from '@/components/Login/LogInForm'
import SignupForm from '@/components/Signup/SignupForm'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const LoginPage = () => {
  const { isSignUpActive } = useSelector((state: RootState) => state.author)
  return (
    <>
      <Head title="LogIn" />
      <div className="flex min-h-screen items-center mt-20 justify-end bg-cover bg-center bg-no-repeat">
        <div
          className={`absolute left-0 top-20 flex h-full w-1/2 items-center justify-center bg-[#00CCCC] transition-transform duration-500 ease-in-out ${
            isSignUpActive ? 'translate-x-full transform' : ''
          }`}
          style={{ zIndex: 1 }}
        ></div>
        <SignupForm />
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
