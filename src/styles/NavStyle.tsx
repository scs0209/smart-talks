import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginBottom: theme.spacing(2),
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
