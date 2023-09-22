import { DarkThemeToggle } from 'flowbite-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'

const Header = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', checkWindowSize)

    return () => window.removeEventListener('resize', checkWindowSize)
  }, [])

  const getNavbarClass = () => {
    if (isOpen) return 'dark:bg-slate-600 bg-gray-200'
    if (isScrolled)
      return 'bg-gray-100 dark:bg-slate-700 transition-colors duration-500'
    return 'bg-transparent transition-colors duration-500'
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <nav className={`${getNavbarClass()} fixed top-0 left-0 z-20 w-full`}>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link
            href="/"
            className="self-center text-2xl font-semibold text-indigo-300 dark:text-white whitespace-nowrap"
          >
            FLIM FINDER
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="#4a77ca"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <ul
          className={`${
            isOpen
              ? 'flex flex-col items-center justify-center bg-gray-200 dark:bg-slate-600 w-full'
              : 'hidden'
          } sm:flex items-center gap-2 text-sm`}
        >
          <li>
            <Link href="/popular" className={styles.items}>
              영화
            </Link>
          </li>
          <li>
            <Link href="/explore/tv" className={styles.items}>
              TV Shows
            </Link>
          </li>
          <li>
            <Link href="/explore/movie" className={styles.items}>
              Movies
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href={`/my-page/${session.user?.email}`}
                  className={styles.items}
                >
                  My Page
                </Link>
              </li>
              {session.user.role === 'admin' && (
                <li>
                  <Link href="/admin" className={styles.items}>
                    Admin Page
                  </Link>
                </li>
              )}
              <button onClick={handleLogout} className={styles.items}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className={styles.items}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className={styles.items}>
                  Signup
                </Link>
              </li>
            </>
          )}
          <DarkThemeToggle className="ml-2" />
        </ul>
      </div>
    </nav>
  )
}

export default Header
