import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import signUp from '@/services/authService'
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
          <Box p={4} bgcolor="#FFFFFF" color="#000000">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="이름" required {...firstName} />
              <Input type="text" placeholder="성" required {...lastName} />
              <Input
                type="text"
                placeholder="사용자 이름"
                required
                {...username}
              />
              <Input type="email" placeholder="이메일" required {...email} />
              <Input
                type="password"
                placeholder="비밀번호"
                required
                {...password}
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  fullWidth
                  style={{ backgroundColor: '#2196F3', color: '#FFFFFF' }}
                >
                  가입하기
                </Button>
              </Box>
            </form>
            <Box mt={3}>
              <Button
                style={{
                  backgroundColor: '#FF9800',
                  color: '#FFFFFF',
                  marginRight: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
              >
                Google 가입
              </Button>
              <Button
                style={{
                  backgroundColor: '#FF9800',
                  color: '#FFFFFF',
                  width: '100%',
                }}
              >
                Facebook 가입
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignupForm
