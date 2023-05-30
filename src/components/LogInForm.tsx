'use client'

/* eslint-disable */
import useInput from '@/hooks/useInput'
import { signIn } from 'next-auth/react'
import Input from './common/Input'
import Button from './common/Button'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Grid, Modal, Typography } from '@mui/material'
import { useStyles } from '@/styles/LoginFormStyle'
import { useCallback, useState } from 'react'
import FindPasswordModal from './FindPasswordModal'

const LoginForm = () => {
  const classes = useStyles()

  const email = useInput('')
  const password = useInput('')

  const [showModal, setShowModal] = useState(false)

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

  const handleGoogleLogin = async () => {
    await signIn('google')
  }

  const handleGithubLogin = async () => {
    await signIn('github')
  }

  const handleForgotPasswordClick = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.formContainer}
      >
        <Typography variant="h2" className={classes.loginHeading}>
          Log In
        </Typography>
        <Grid item className={classes.inputField}>
          <label htmlFor="email">Email</label>
          <Input id="email" type="text" required {...email} />
        </Grid>
        <Grid item className={classes.inputField}>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" required {...password} />
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <Button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              backgroundColor: '#DB4437',
              color: 'white',
              marginRight: '0.5rem',
            }}
          >
            <FaGoogle style={{ marginRight: '0.5rem' }} />
            Sign In with Google
          </Button>
          <Button
            type="button"
            onClick={handleGithubLogin}
            style={{
              backgroundColor: '#333',
              color: 'white',
              marginRight: '0.5rem',
            }}
          >
            <FaGithub style={{ marginRight: '0.5rem' }} />
            Sign In with GitHub
          </Button>
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <Button type="submit">Sign In</Button>
        </Grid>
        <Grid item className={classes.signUpText}>
          <Typography variant="body1">
            계정이 없으신가요?{' '}
            <Link href="/signup" className={classes.signUpLink}>
              Sign Up
            </Link>
          </Typography>
          <Typography variant="body1">
            if you forgot your password?
            <span
              className={classes.forgotPasswordLink}
              onClick={handleForgotPasswordClick}
            >
              Click
            </span>{' '}
          </Typography>
        </Grid>
      </Grid>
      <FindPasswordModal open={showModal} onClose={handleCloseModal} />
    </form>
  )
}

export default LoginForm
