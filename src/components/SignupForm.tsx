import { useRouter } from 'next/router'
import { signUp } from '../services/authService'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useInput from '../hooks/useInput'

const SignupForm = () => {
  const username = useInput('')
  const email = useInput('')
  const password = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3}>
          <Box p={4}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="이름" required {...firstName} />
              <Input type="email" placeholder="이메일" required {...email} />
              <Input
                type="password"
                placeholder="비밀번호"
                required
                {...password}
              />
              <Box mt={2}>
                <Button type="submit" fullWidth>
                  회원가입
                </Button>
              </Box>
            </form>
            <Box mt={3}>
              <Button>Google 회원가입</Button>
              <Button>Facebook 회원가입</Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignupForm
