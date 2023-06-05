import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Head from '@/components/common/HeadInfo'
import { Box, Container, Typography } from '@mui/material'
import ServiceCard from '@/components/ServiceCard'
import serviceData from '@/services.json'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'authenticated')
    console.log('session', session.user?.email, session)
  const isLoading = status === 'loading'

  useEffect(() => {
    if (!isLoading && !session) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      window.location.href = '/login'
    }
  }, [session, isLoading])

  return (
    <>
      <Head title="Home" />
      {session && (
        <Container sx={{ textAlign: 'center' }}>
          <Box mt={4}>
            <Typography variant="h3" gutterBottom>
              {`어서오세요, ${session.user?.email}님!`}
            </Typography>
            <Typography variant="h5" gutterBottom>
              어떤 서비스를 원하시나요?
            </Typography>
            <Box
              mt={2}
              display="flex"
              flexWrap="wrap"
              sx={{ justifyContent: 'center' }}
            >
              {serviceData.services.map((service) => (
                <ServiceCard
                  key={service.link}
                  title={service.title}
                  description={service.description}
                  link={service.link}
                  image={service.image}
                />
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </>
  )
}
