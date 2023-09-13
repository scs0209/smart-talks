import { DarkThemeToggle } from 'flowbite-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useCallback } from 'react'

const Nav = () => {
  const { data: session } = useSession()

  const handleLogout = useCallback(() => {
    signOut()
  }, [])

  return (
    <nav className="absolute top-0 left-0 z-10 w-full bg-transparent">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="self-center text-2xl font-semibold text-white whitespace-nowrap"
          >
            FLIM FINDER
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/popular"
            className="mr-3 text-sm text-blue-600 dark:text-blue-500 hover:underline"
          >
            영화
          </Link>
          {session ? (
            <div className="flex items-center">
              <Link
                href={`/my-page/${session.user?.email}`}
                className="mr-3 text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                My Page
              </Link>
              {session.user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="mr-3 text-sm text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Admin Page
                </Link>
              )}
              <span
                onClick={handleLogout}
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                href="/login"
                className="mr-3 text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                Signup
              </Link>
            </div>
          )}
          <DarkThemeToggle className="ml-2" />
        </div>
      </div>
    </nav>
  )
}

export default Nav
