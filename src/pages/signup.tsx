import Head from 'next/head'
import Link from 'next/link'
import SignupForm from '@/components/SignupForm'

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <SignupForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </>
  )
}

export default Signup
