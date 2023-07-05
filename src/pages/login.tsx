import LoginForm from '@/components/Login/LogInForm'
import Head from '@/components/common/HeadInfo'

const LoginPage = () => {
  return (
    <div className="mt-6">
      <Head title="LogIn" />
      <LoginForm />
    </div>
  )
}

export default LoginPage
