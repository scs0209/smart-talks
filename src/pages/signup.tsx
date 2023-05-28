import Link from 'next/link'
import SignupForm from '@/components/SignupForm'
import Head from '@/components/common/HeadInfo'
import { Typography } from '@mui/material'

const Signup = () => {
  return (
    <>
      <Head title="Sign Up" />
      <SignupForm />
      <Typography
        variant="body1"
        style={{ color: '#000000', marginTop: '1rem' }}
      >
        이미 계정이 있으신가요?{' '}
        <Link
          href="/login"
          style={{ textDecoration: 'none', color: '#2196F3' }}
        >
          로그인
        </Link>
      </Typography>
    </>
  )
}

export default Signup
