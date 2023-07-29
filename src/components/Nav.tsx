import { DarkThemeToggle } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { FormEvent, useCallback, useState } from 'react'

const Nav = () => {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleLogout = useCallback(() => {
    signOut()
  }, [])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search-results/${searchTerm}`)
    setSearchTerm('')
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
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
                  className="text-sm mr-3 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  My Page
                </Link>
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
                  className="text-sm mr-3 text-blue-600 dark:text-blue-500 hover:underline"
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
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
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
            <form onSubmit={handleSearch}>
              <input
                type="text"
                id="search-navbar"
                className="block w-200 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
