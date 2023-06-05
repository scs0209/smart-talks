/* eslint-disable */
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
  forgotPasswordLink: {
    color: '#2196F3',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    width: 400,
    borderRadius: theme.spacing(1),
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
}))
