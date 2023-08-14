import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import Nav from './Nav'

interface Props {
  children: ReactNode
}

const ProtectedLayout: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const authorized = status === 'authenticated'
  const unAuthorized = status === 'unauthenticated'
  const loading = status === 'loading'

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return

    // if the user is not authorized, redirect to the login page
    // with a return url to the current page
    if (unAuthorized) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    }
  }, [loading, unAuthorized, status, router])

  // 로딩 중이거나 세션이 ���으면 로딩 메시지 표시
  if (loading) {
    return <>Loading...</>
  }

  // 로그인이 확인되면 자식 컴포넌트를 렌더링
  return (
    <>
      <Nav />
      {authorized ? <div>{children}</div> : <></>}
    </>
  )
}

export default ProtectedLayout
