import useInput from '@/hooks/useInput'
import { signIn } from 'next-auth/react'
import Input from './common/Input'
import Button from './common/Button'

const LoginForm = () => {
  const email = useInput('')
  const password = useInput('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email: email.value,
      password: password.value,
    })
    if (result?.error) {
      console.log('Error:', result.error)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Input type="text" required {...email} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input type="password" required {...password} />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  )
}

export default LoginForm
