import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    margin: '0.5rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  signUpText: {
    marginTop: '1rem',
    color: theme.palette.text.secondary,
  },
  signUpLink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  loginHeading: {
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
  },
}))
