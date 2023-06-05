/* eslint-disable */
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginBottom: 0,
    },
    navLinks: {
      marginLeft: 'auto',
    },
    homeLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }),
)
