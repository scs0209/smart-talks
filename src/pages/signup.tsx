import Link from 'next/link'
import SignupForm from '@/components/SignupForm'
import Head from '@/components/common/HeadInfo'

const Signup = () => {
  return (
    <>
      <Head title="Sign Up" />
      <SignupForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </>
  )
}

export default Signup
