import Head from '@/components/common/HeadInfo'
import LoginForm from '@/components/Login/LogInForm'

const LoginPage = () => {
  return (
    <div className="mt-6">
      <Head title="LogIn" />
      <LoginForm />
    </div>
  )
}

export default LoginPage
