/* eslint-disable */
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
})
