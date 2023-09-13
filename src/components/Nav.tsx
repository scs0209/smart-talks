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
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <div className="flex items-center">
            <Link
              href="/"
              className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >
              SMAX
            </Link>
          </div>
          <div className="flex items-center">
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
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li>
                <Link
                  href="/popular"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  영화
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  예매
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
