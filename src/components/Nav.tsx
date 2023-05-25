import Link from 'next/link'
import { createStyles, makeStyles } from '@mui/styles'
import { AppBar, Toolbar, Typography, Button, Theme } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useCallback } from 'react'

const useStyles = makeStyles((theme: Theme) =>
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

const Nav = () => {
  const classes = useStyles()
  const { data: session } = useSession()

  const handleLogout = useCallback(() => {
    signOut()
  }, [])

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">
          <Link href="/" className={classes.homeLink} passHref>
            My App
          </Link>
        </Typography>
        <div className={classes.navLinks}>
          {session ? (
            <>
              <Button component={Link} href="/my-page" color="inherit">
                My Page
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} href="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} href="/signup" color="inherit">
                Signup
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
