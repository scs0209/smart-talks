import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getUserByEmail } from '@/services/apiServices'

const MyPage = () => {
  const router = useRouter()
  const { email } = router.query
  const { data: session, status } = useSession()

  useEffect(() => {
    if (email) {
      // 이메일에 해당하는 사용자 정보를 가져옴
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUserByEmail(email as string)
          // 여기서 fetchedUser와 세션 정보를 비교하여 권한 검사 등을 수행할 수 있습니다.
          console.log('User:', fetchedUser)
          console.log('Session:', session)
        } catch (error) {
          // 오류 처리
          console.error('Failed to fetch user:', error)
        }
      }

      fetchUser()
    }
  }, [email])

  if (status === 'loading') {
    // 세션 정보 로딩 중인 경우 로딩 상태를 표시할 수 있습니다.
    return <div>Loading...</div>
  }

  if (!session) {
    // 세션이 없는 경우 로그인 페이지로 리다이렉트할 수 있습니다.
    // 예: router.push('/login')
    return <div>Please log in</div>
  }

  return (
    <div>
      <Typography variant="h2">My Page</Typography>
      <Typography variant="body1">Email: {session.user?.email}</Typography>
      {/* 필요한 사용자 정보를 여기에 추가 */}
    </div>
  )
}

export default MyPage
