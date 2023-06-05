/* eslint-disable */
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => ({
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(3),
    width: 500,
    borderRadius: theme.spacing(1),
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  formContainer: {
    marginTop: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  cancelButton: {
    marginRight: theme.spacing(1),
  },
}))
